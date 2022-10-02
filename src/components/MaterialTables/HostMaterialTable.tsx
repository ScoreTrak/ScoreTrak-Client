import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import { useEffect, useState } from "react";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import {
  DeleteRequest,
  StoreRequest,
  UpdateRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host/v1/host_pb";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import { CircularProgress } from "@material-ui/core";
import { IHost } from "../../types/material_table";
import {
  useAddHostMutation,
  useDeleteHostMutation,
  useHostsQuery,
  useUpdateHostMutation,
} from "../../lib/queries/hosts";
import { useTeamsQuery } from "../../lib/queries/teams";
import { useHostGroupsQuery } from "../../lib/queries/host_groups";
import { hostToIHost, IHostToHost } from "../../lib/material-table/hosts";
import grpcWeb from "grpc-web";

export function HostMaterialTable() {
  const title = "Hosts";
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: hostsData,
    isLoading: hostsIsLoading,
    isSuccess: hostsIsSuccess,
  } = useHostsQuery();
  const { data: teamsData } = useTeamsQuery();
  const { data: hostGroupsData } = useHostGroupsQuery();

  const addHost = useAddHostMutation();
  const updateHost = useUpdateHostMutation();
  const deleteHost = useDeleteHostMutation();

  const [columns, setColumns] = useState<Column<IHost>[]>([
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Address", field: "address" },
    { title: "Host Group ID", field: "hostGroupId" },
    { title: "Team ID", field: "teamId" },
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
    {
      title: "Edit Host(Allow users to change Addresses)",
      field: "editHost",
      type: "boolean",
    },
    {
      title:
        "Address Range(comma separated list of allowed CIDR ranges and hostnames)",
      field: "addressListRange",
    },
  ]);

  useEffect(() => {
    if (hostGroupsData) {
      const lookup: Record<string, string> = {};

      for (let i = 0; i < hostGroupsData.length; i++) {
        const hostGroup = hostGroupsData[i];
        lookup[
          hostGroup.getId()?.getValue() as string
        ] = `${hostGroup.getName()} (ID: ${
          hostGroup.getId()?.getValue() as string
        }`;
      }

      setColumns((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          const column = prevState[i];
          if (column.title === "Host Group ID") {
            column.lookup = lookup;
          }
        }

        return prevState;
      });
    }
  }, [hostGroupsData]);

  useEffect(() => {
    if (teamsData) {
      const lookup: Record<string, string> = {};

      for (let i = 0; i < teamsData.length; i++) {
        const team = teamsData[i];
        lookup[team.getId()?.getValue() as string] = `${team.getName()} (ID: ${
          team.getId()?.getValue() as string
        }`;
      }

      setColumns((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          const column = prevState[i];
          if (column.title === "Team ID") {
            column.lookup = lookup;
          }
        }

        return prevState;
      });
    }
  }, [teamsData]);

  return (
    <>
      {!hostsIsLoading && hostsIsSuccess ? (
        <MaterialTable
          title={title}
          columns={columns}
          data={hostsData.map(hostToIHost)}
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
                  const u = IHostToHost(newData);
                  storeRequest.addHosts(u, 0);

                  addHost.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store Host: ${
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
                    const u = IHostToHost(newData);
                    updateRequest.setHost(u);

                    updateHost.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update Host: ${
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

                  deleteHost.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to delete Host: ${
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
