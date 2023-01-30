import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import { useEffect, useState } from "react";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import {
  DeleteRequest,
  StoreRequest,
  TestServiceRequest,
  UpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/service/v1/service_pb";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";
import { CircularProgress } from "@material-ui/core";
import { gRPCClients } from "../../lib/grpc/gRPCClients";
import { IService } from "../../types/material_table";
import { useHostsQuery } from "../../lib/queries/hosts";
import { useServiceGroupsQuery } from "../../lib/queries/service-groups";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useServicesQuery,
  useUpdateServiceMutation,
} from "../../lib/queries/services";
import grpcWeb from "grpc-web";
import {
  IServiceToService,
  serviceToIService,
} from "../../lib/material-table/services";

export function ServiceMaterialTable() {
  const title = "Services";
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: servicesData,
    isLoading: servicesIsLoading,
    isSuccess: servicesIsSuccess,
  } = useServicesQuery();
  const {
    data: serviceGroupsData,
  } = useServiceGroupsQuery();
  const {
    data: hostsData,
  } = useHostsQuery();

  const addService = useAddServiceMutation();
  const updateService = useUpdateServiceMutation();
  const deleteService = useDeleteServiceMutation();

  const [columns, setColumns] = useState<Column<IService>[]>([
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    {
      title: "Name",
      field: "name",
      lookup: {
        PING: "PING",
        DNS: "DNS",
        FTP: "FTP",
        LDAP: "LDAP",
        HTTP: "HTTP",
        IMAP: "IMAP",
        SMB: "SMB",
        SSH: "SSH",
        WINRM: "WINRM",
        SQL: "SQL",
        CalDav: "CalDav",
      },
    },
    { title: "Display Name(Columns on Status page)", field: "displayName" },
    {
      title: "Weight(Points per successful check)",
      field: "weight",
      type: "numeric",
    },
    {
      title: "Points Boost",
      field: "pointsBoost",
      type: "numeric",
      initialEditValue: 0,
    },
    {
      title: "Hide from Scoreboard",
      field: "hide",
      type: "boolean",
      initialEditValue: false,
    },
    {
      title: "Pause Scoring",
      field: "pause",
      type: "boolean",
      initialEditValue: false,
    },
    { title: "Service Group ID", field: "serviceGroupId" },
    { title: "Host ID", field: "hostId" },
    {
      title: "Round Units(Frequency)",
      field: "roundUnits",
      type: "numeric",
      initialEditValue: 1,
    },
    {
      title: "Round Delay(Shift in frequency)",
      field: "roundDelay",
      type: "numeric",
      initialEditValue: 0,
    },
  ]);

  useEffect(() => {
    if (serviceGroupsData) {
      const lookup: Record<string, string> = {};

      for (let i = 0; i < serviceGroupsData.length; i++) {
        const serviceGroup = serviceGroupsData[i];
        lookup[
          serviceGroup.getId()?.getValue() as string
        ] = `${serviceGroup.getName()} (ID: ${
          serviceGroup.getId()?.getValue() as string
        }`;
      }

      setColumns((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          const column = prevState[i];
          if (column.title === "Service Group ID") {
            column.lookup = lookup;
          }
        }

        return prevState;
      });
    }
  }, [serviceGroupsData]);

  useEffect(() => {
    if (hostsData) {
      const lookup: Record<string, string> = {};

      for (let i = 0; i < hostsData.length; i++) {
        const host = hostsData[i];
        lookup[
          host.getId()?.getValue() as string
        ] = `${host.getAddress()} (ID: ${host.getId()?.getValue() as string}`;
      }

      setColumns((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          const column = prevState[i];
          if (column.title === "Host ID") {
            column.lookup = lookup;
          }
        }

        return prevState;
      });
    }
  }, [hostsData]);

  return (
    <>
      {!servicesIsLoading && servicesIsSuccess ? (
        <MaterialTable
          title={title}
          actions={[
            {
              icon: "flash_on",
              tooltip: "test service",
              onClick: (event, rowData) => {
                return gRPCClients.service.v1.serviceServicePromiseClient
                  .testService(
                    new TestServiceRequest().setId(
                      new UUID().setValue((rowData as IService).id as string)
                    ),
                    {}
                  )
                  .then(
                    (response) => {
                      // ToDo: Implement Deadline
                      if (response.getCheck()?.getPassed()?.getValue()) {
                        enqueueSnackbar(
                          `Check Passed. Log: ${response
                            .getCheck()
                            ?.getLog()}.`,
                          { variant: Severity.Success }
                        );
                      } else {
                        enqueueSnackbar(
                          `Check Failed. Log: ${response
                            .getCheck()
                            ?.getLog()}. Err: ${response
                            .getCheck()
                            ?.getErr()}.`,
                          { variant: Severity.Warning }
                        );
                      }
                    },
                    (err: any) => {
                      enqueueSnackbar(
                        `Failed to dispatch a check: ${err.message}. Error code: ${err.code}`,
                        {
                          variant: Severity.Error,
                          action: SnackbarDismissButton,
                        }
                      );
                    }
                  );
              },
            },
          ]}
          columns={columns}
          data={servicesData.map(serviceToIService)}
          options={{
            pageSizeOptions: [5, 10, 20, 50, 100, 500, 1000],
            pageSize: 20,
            emptyRowsWhenPaging: false,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  const storeRequest = new StoreRequest();
                  const u = IServiceToService(newData);
                  storeRequest.addServices(u, 0);

                  addService.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store service: ${
                          (error as grpcWeb.RpcError).message
                        }. Error code: ${(error as grpcWeb.RpcError).code}`,
                        {
                          variant: Severity.Error,
                          action: SnackbarDismissButton,
                        }
                      );
                      reject();
                    },
                  });
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  if (oldData) {
                    const updateRequest = new UpdateRequest();
                    const u = IServiceToService(newData);
                    updateRequest.setService(u);

                    updateService.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update service: ${
                            (error as grpcWeb.RpcError).message
                          }. Error code: ${(error as grpcWeb.RpcError).code}`,
                          {
                            variant: Severity.Error,
                            action: SnackbarDismissButton,
                          }
                        );
                        reject();
                      },
                    });
                    resolve();
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  const deleteRequest = new DeleteRequest();
                  deleteRequest.setId(
                    new UUID().setValue(oldData.id as string)
                  );

                  deleteService.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to delete service: ${
                          (error as grpcWeb.RpcError).message
                        }. Error code: ${(error as grpcWeb.RpcError).code}`,
                        {
                          variant: Severity.Error,
                          action: SnackbarDismissButton,
                        }
                      );
                      reject();
                    },
                  });
                  resolve();
                }, 600);
              }),
          }}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
