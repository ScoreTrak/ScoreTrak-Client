import { Severity } from "../../types/types";
import {
  DeleteRequest,
  RedeployRequest,
  StoreRequest,
  UpdateRequest,
} from "../../lib/scoretrakapis/scoretrak/service_group/v1/service_group_pb";
import { UUID } from "../../lib/scoretrakapis/scoretrak/proto/v1/uuid_pb";
import MaterialTable, { Column } from "@material-table/core";
import { Box, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import { gRPCClients } from "../../grpc/gRPCClients";
import {
  useAddServiceGroupMutation,
  useDeleteServiceGroupMutation,
  useServiceGroupsQuery,
  useUpdateServiceGroupMutation,
} from "../../lib/queries/service-groups";
import { IServiceGroup } from "../../types/material_table";
import {
  IServiceGroupToServiceGroup,
  serviceGroupToIServiceGroup,
} from "../../lib/material-table/service-groups";
import grpcWeb from "grpc-web";

export default function ServiceGroupMaterialTable() {
  const title = "Service Group";
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isSuccess } = useServiceGroupsQuery();

  const addServiceGroup = useAddServiceGroupMutation();
  const updateServiceGroup = useUpdateServiceGroupMutation();
  const deleteServiceGroup = useDeleteServiceGroupMutation();

  const columns: Array<Column<IServiceGroup>> = [
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Service Group Name", field: "name", editable: "onAdd" },
    { title: "Enabled", field: "enabled", type: "boolean" },
    { title: "Display Name", field: "displayName" },
    {
      title: "Skip Helper (Skips autodeploy of workers)",
      field: "skipHelper",
      type: "boolean",
    },
    {
      title:
        "Label(Workers would be deployed on nodes with the following label)",
      field: "label",
      editable: "onAdd",
    },
  ];

  return (
    <>
      {!isLoading && isSuccess ? (
        <MaterialTable
          title={title}
          actions={[
            {
              icon: "replay",
              tooltip: "redeploy workers",
              onClick: (event, rowData) => {
                return gRPCClients.serviceGroupClient
                  .redeploy(
                    new RedeployRequest().setId(
                      new UUID().setValue(
                        (rowData as IServiceGroup).id as string
                      )
                    ),
                    {}
                  )
                  .then(
                    () => {
                      enqueueSnackbar(
                        "Workers were deployed! Please make sure they are in a healthy state before enabling the service group.",
                        { variant: Severity.Success }
                      );
                    },
                    (err: any) => {
                      enqueueSnackbar(
                        `Unable to redeploy service group workers: ${err.message}. Error code: ${err.code}`,
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
          data={data.map(serviceGroupToIServiceGroup)}
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
                  const u = IServiceGroupToServiceGroup(newData);
                  storeRequest.setServiceGroup(u);

                  addServiceGroup.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store service group: ${
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
                    const u = IServiceGroupToServiceGroup(newData);
                    updateRequest.setServiceGroup(u);

                    updateServiceGroup.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update service group: ${
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

                  deleteServiceGroup.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to delete service group: ${
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
