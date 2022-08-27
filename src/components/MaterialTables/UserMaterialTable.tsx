import React, { useEffect, useState } from "react";
import { Role } from "../../grpc/token/token";
import MaterialTable, { Column } from "@material-table/core";
import {
  DeleteRequest,
  StoreRequest,
  UpdateRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/user/v1/user_pb";
import { Severity } from "../../types/types";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import { CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import { IUser } from "../../types/material_table";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from "../../lib/queries/users";
import { useTeamsQuery } from "../../lib/queries/teams";
import { IUserToUser, userToIUser } from "../../lib/material-table/users";
import grpcWeb from "grpc-web";


export default function UserMaterialTable() {
  const title = "Users";
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: usersData,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useUsersQuery();
  const {
    data: teamsData,
  } = useTeamsQuery();

  const addUser = useAddUserMutation();
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  const [columns, setColumns] = useState<Column<IUser>[]>([
    { title: "ID (optional)", field: "id", editable: "onAdd" as const },
    { title: "Username", field: "username" },
    {
      title: "Password",
      field: "password",
      render: (rowData: any) => <React.Fragment />,
    },
    {
      title: "Password Hash",
      field: "passwordHash",
      editable: "never" as const,
    },
    { title: "Team ID", field: "teamId" },
    {
      title: "Role",
      field: "role",
      lookup: {
        [Role.Black]: Role.Black,
        [Role.Blue]: Role.Blue,
        [Role.Red]: Role.Red,
      },
    },
  ]);

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
      {!usersIsLoading && usersIsSuccess ? (
        <MaterialTable
          title={title}
          columns={columns}
          data={usersData.map(userToIUser)}
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
                  // https://github.com/protocolbuffers/protobuf/issues/1591
                  const u = IUserToUser(newData);
                  storeRequest.addUsers(u, 0);

                  addUser.mutate(storeRequest, {
                    onError: (error) => {
                      enqueueSnackbar(
                        `Unable to store user: ${
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
                    const u = IUserToUser(newData);
                    updateRequest.setUser(u);

                    updateUser.mutate(updateRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to update user: ${
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

                  deleteUser.mutate(deleteRequest, {
                    onError: (error) => {
                      enqueueSnackbar(`Unable to delete user: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton, });
                      reject();
                    },
                  });
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
