import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import {
  DeleteRequest,
  StoreRequest,
  UpdateRequest,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v1/team_pb";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";
import { CircularProgress } from "@material-ui/core";
import { ITeam } from "../../types/material_table";
import {
  useAddTeamMutation,
  useDeleteTeamMutation,
  useTeamsQuery,
  useUpdateTeamMutation,
} from "../../lib/queries/teams";
import { ITeamToTeam, teamToITeam } from "../../lib/material-table/teams";
import grpcWeb from "grpc-web";

export function TeamMaterialTable() {
  const title = "Teams";
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isSuccess } = useTeamsQuery();

  const addTeam = useAddTeamMutation();
  const updateTeam = useUpdateTeamMutation();
  const deleteTeam = useDeleteTeamMutation();

  const columns: Array<Column<ITeam>> = [
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Team Name", field: "name" },
    { title: "Index", field: "index", type: "numeric" },
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
          data={data.map(teamToITeam)}
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
                  const u = ITeamToTeam(newData);
                  storeRequest.addTeams(u, 0);

                  addTeam.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store team: ${
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
                    const u = ITeamToTeam(newData);
                    updateRequest.setTeam(u);

                    updateTeam.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update team: ${
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

                  deleteTeam.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to delete team: ${
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
