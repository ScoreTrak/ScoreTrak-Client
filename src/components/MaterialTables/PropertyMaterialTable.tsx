import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import { useEffect, useState } from "react";
import { Severity } from "../../types/types";
import { SnackbarDismissButton } from "../SnackbarDismissButton";
import {
  DeleteRequest,
  StoreRequest,
  UpdateRequest,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/property/v1/property_pb";
import Box from "@material-ui/core/Box";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import { CircularProgress } from "@material-ui/core";
import {
  useAddPropertyMutation,
  useDeletePropertyMutation,
  usePropertiesQuery,
  useUpdatePropertyMutation,
} from "../../lib/queries/properties";
import { IProperty } from "../../types/material_table";
import { useServicesQuery } from "../../lib/queries/services";
import {
  IPropertyToProperty,
  propertyToIProperty,
} from "../../lib/material-table/properties";
import grpcWeb from "grpc-web";

export function PropertyMaterialTable() {
  const title = "Properties";
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: propertiesData,
    isLoading: propertiesIsLoading,
    isSuccess: propertiesIsSuccess,
  } = usePropertiesQuery();
  const { data: servicesData } = useServicesQuery();

  const addProperty = useAddPropertyMutation();
  const updateProperty = useUpdatePropertyMutation();
  const deleteProperty = useDeletePropertyMutation();

  const [columns, setColumns] = useState<Column<IProperty>[]>([
    { title: "Key", field: "key", editable: "onAdd" },
    { title: "Value", field: "value" },
    {
      title: "Status",
      field: "status",
      lookup: { View: "View", Hide: "Hide", Edit: "Edit" },
    },
    { title: "Service ID", field: "serviceId", editable: "onAdd" },
  ]);

  useEffect(() => {
    if (servicesData) {
      const lookup: Record<string, string> = {};

      for (let i = 0; i < servicesData.length; i++) {
        const service = servicesData[i];
        lookup[
          service.getId()?.getValue() as string
        ] = `${service.getName()} (ID: ${
          service.getId()?.getValue() as string
        }`;
      }

      setColumns((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          const column = prevState[i];
          if (column.title === "Service ID") {
            column.lookup = lookup;
          }
        }

        return prevState;
      });
    }
  }, [servicesData]);

  return (
    <>
      {!propertiesIsLoading && propertiesIsSuccess ? (
        <Box height="100%" width="100%">
          <MaterialTable
            title={title}
            columns={columns}
            data={propertiesData.map(propertyToIProperty)}
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
                    const u = IPropertyToProperty(newData);
                    storeRequest.addProperties(u, 0);

                    addProperty.mutate(storeRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to store property: ${
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
                      const u = IPropertyToProperty(newData);
                      updateRequest.setProperty(u);

                      updateProperty.mutate(updateRequest, {
                        onError: (error) => {
                          enqueueSnackbar(
                            `Unable to update property: ${
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
                    deleteRequest.setKey(oldData.key);
                    deleteRequest.setServiceId(
                      new UUID().setValue(oldData.serviceId as string)
                    );

                    deleteProperty.mutate(deleteRequest, {
                      onError: (error) => {
                        enqueueSnackbar(
                          `Unable to delete property: ${
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
        </Box>
      ) : (
        <Box height="100%" width="100%" m="auto">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
