import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import MaterialTable, { Column } from "@material-table/core";
import { Severity } from "../../types/types";
import { CircularProgress } from "@material-ui/core";
import { UUID } from "../../lib/scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {
  DeleteRequest,
  StoreRequest,
  UpdateRequest,
} from "../../lib/scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import {
  useAddHostGroupMutation,
  useDeleteHostGroupMutation,
  useHostGroupsQuery,
  useUpdateHostGroupMutation,
} from "../../lib/queries/host_groups";
import { IHostGroup } from "../../types/material_table";
import {
  hostGroupToIHostGroup,
  IHostGroupToHostGroup,
} from "../../lib/material-table/host-groups";
import grpcWeb from "grpc-web";

export default function HostGroupMaterialTable() {
  const title = "Host Groups";
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isSuccess } = useHostGroupsQuery();

  const addHostGroup = useAddHostGroupMutation();
  const updateHostGroup = useUpdateHostGroupMutation();
  const deleteHostGroup = useDeleteHostGroupMutation();

  const columns: Array<Column<IHostGroup>> = [
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Host Group Name", field: "name" },
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
  ];

  return (
    <>
      {!isLoading && isSuccess ? (
        <MaterialTable
          title={title}
          columns={columns}
          data={data.map(hostGroupToIHostGroup)}
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
                  const u = IHostGroupToHostGroup(newData);
                  storeRequest.addHostGroups(u, 0);

                  addHostGroup.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store hostGroup: ${
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
                    const u = IHostGroupToHostGroup(newData);
                    updateRequest.setHostGroup(u);

                    updateHostGroup.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update hostGroup: ${
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

                  deleteHostGroup.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to delete hostGroup: ${
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
