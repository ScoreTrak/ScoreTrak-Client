import { Service as ReportService } from "~/types/report";
import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import {
  Check,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/check/v1/check_pb";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {
  Property,
  Status, UpdateRequest
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/property/v1/property_pb";
import {
  Host,
  UpdateRequest as UpdateRequestHost
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host/v1/host_pb";
import { Severity } from "~/types/types";
import { SnackbarDismissButton } from "~/components/SnackbarDismissButton";
import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { useStyles } from "./SingleTeamDetails";
import { usePropertiesByServiceIdQuery, useUpdatePropertyMutation } from "~/lib/queries/properties";
import { useHostQuery, useUpdateHostMutation } from "~/lib/queries/hosts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChecksByServiceIDQuery } from "~/lib/queries/checks";
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import grpcWeb from "grpc-web";

export type CheckDetail = {
  service_id: string;
  host_id: string;
  passed: boolean | null | undefined;
  err: string | null | undefined;
  log: string | null | undefined;
  round_id: number;
  pause: boolean;
};

type SingleTeamDetailsAccordionDetailsBoxProps = {
  teamID: string;
  serviceID: string;
  hostID: string;
  service: ReportService;
};
export type HostData = {
  address: string;
  edit_host: boolean;
};
export type PropertyDetail = {
  key: string;
  value_used: string;
  service_id: string;
  value: undefined | string;
  editable_value: boolean;
};

interface IHostAddressFormInput {
  address: String;
}

function propertyV1ToPropertyDetail(property: Property): PropertyDetail {
  return {
    key: property.getKey(),
    value_used: property.getValue()?.getValue().valueOf(),
    service_id: property.getKey(),
    value: property.getValue()?.getValue() ? property.getValue()?.getValue() : undefined,
    editable_value: property.getStatus() === Status.STATUS_EDIT
  }
}

function checkV1ToCheckDetail(check: Check): CheckDetail {
  return {
    service_id: check.getServiceId()?.getValue().valueOf(),
    round_id: check.getRoundId().valueOf(),
    passed: check.getPassed()?.getValue() as boolean,
    log: check.getLog(),
    err: check.getErr(),
    pause: false,
  }
}

export function SingleTeamDetailsAccordionDetailsBox(
  props: SingleTeamDetailsAccordionDetailsBoxProps
) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();


  const {data: propertiesData, isLoading: propertiesIsLoading} = usePropertiesByServiceIdQuery(props.serviceID)
  const {data: hostData, isLoading: hostIsLoading} = useHostQuery(props.hostID)
  const {data: checksData, isLoading: checksIsLoading} = useChecksByServiceIDQuery(props.serviceID)
  const updateHost = useUpdateHostMutation()
  const updatedProperty = useUpdatePropertyMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<IHostAddressFormInput>({
    defaultValues: {
      address: ""
    }
  })

  const propertyColumns: Array<Column<PropertyDetail>> = [
    { title: "Key", field: "key", editable: "never" as const },
    { title: "Value Used", field: "value_used", editable: "never" as const },
    { title: "Current Value", field: "value", emptyValue: "(empty)" },
    { title: "editable_value", field: "status", hidden: true },
  ];

  const checkColumns = [
    {
      width: 5,
      render: (rowData: any) => (
        <div>
          {" "}
          {rowData.passed ? (
            <CheckCircleOutlineIcon className={classes.iconSuccess} />
          ) : (
            <ErrorIcon className={classes.iconError} />
          )}{" "}
        </div>
      ),
    },
    {
      title: "Round",
      field: "round_id",
      defaultSort: "desc" as const,
      type: "numeric" as const,
      width: 5,
    },
    {
      title: "Passed",
      field: "passed",
      hidden: true,
      type: "boolean" as const,
    },
    { title: "Parent Host ID", field: "host_id", hidden: true },
    { title: "Service ID", field: "service_id", hidden: true },
    { title: "Response", field: "log" },
    { title: "Error Details", field: "err" },
    { title: "Pause", field: "pause", hidden: true },
  ];

  const onHostAddressFormSubmit: SubmitHandler<IHostAddressFormInput> = data => {
    const {address} = data
    console.log(address);

    const udpateHostRequest = new UpdateRequestHost();
    const hostUUID = new UUID()
    hostUUID.setValue(props.hostID)
    const host = new Host()
    host.setId(hostUUID)
    host.setAddress(address)
    udpateHostRequest.setHost(host)

    updateHost.mutate(udpateHostRequest, {
      onError: (error) => {
        enqueueSnackbar(
          `Failed to update host details ${props.hostID}: ${error.message}. Error code: ${error.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    })
  }

  return (
    <Box width="100%" bgcolor="background.paper" textAlign="left">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {props.service.Check?.Log && (
            <Alert severity={props.service.Check?.Passed ? "info" : "warning"}>
              <AlertTitle>Response</AlertTitle>
              {props.service.Check?.Log}
            </Alert>
          )}
          <br />
          {props.service.Check?.Err && (
            <Alert severity="error">
              <AlertTitle>Error Details</AlertTitle>
              {props.service.Check?.Err}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {checksData && !checksIsLoading &&
            <MaterialTable
            options={{pageSizeOptions: [5, 10, 20, 50, 100], pageSize: 5}}
            title="Previous Rounds"
            columns={checkColumns}
            data={checksData?.map(checkV1ToCheckDetail)}
            />
          }
        </Grid>
        <Grid item xs={6}>
          {propertiesData && !propertiesIsLoading && (
            <>
              <MaterialTable
                options={{
                  pageSizeOptions: [3, 5, 10, 20, 50, 100],
                  pageSize: propertiesData.length,
                  emptyRowsWhenPaging: false,
                }} //
                title="Properties"
                columns={propertyColumns}
                data={propertiesData.map(propertyV1ToPropertyDetail)}
                cellEditable={{
                  isCellEditable: (rowData: PropertyDetail, columnDef) => {
                    return rowData.editable_value;
                  },
                  onCellEditApproved: (
                    newValue,
                    oldValue,
                    rowData: PropertyDetail,
                    columnDef
                  ) => {
                    return new Promise<void>((resolve, reject) => {
                      setTimeout(() => {
                        if (newValue !== "" && newValue.trim() === "") {
                          reject("Only empty strings are not allowed");
                        }
                        const property = new Property();
                        property.setKey(rowData.key);
                        const uuid = new UUID();
                        uuid.setValue(props.serviceID);
                        property.setServiceId(uuid);
                        const stringValue = new StringValue();
                        stringValue.setValue(newValue);
                        property.setValue(stringValue);
                        const updatePropertyRequest = new UpdateRequest();
                        updatePropertyRequest.setProperty(property);
                        updatedProperty.mutate(updatePropertyRequest, {
                          onError: (error: grpcWeb.RpcError) => {
                            enqueueSnackbar(
                              `Encountered an error while loading previous checks: ${err.message}. Error code: ${err.code}`,
                              {
                                variant: Severity.Error,
                                action: SnackbarDismissButton,
                              }
                            );
                          }
                        })
                      }, 600);
                    });
                  },
                }}
              />
            </>
          )}
          {hostData && !hostIsLoading && hostData?.getEditHost() && (
            <div>
              <form
                style={{ width: "100%", marginTop: "1vh" }}
                onSubmit={handleSubmit(onHostAddressFormSubmit)}
              >

                <FormControl
                  style={{ display: "flex", flexDirection: "row", width: "100%" }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    inputRef={register}
                    id="address"
                    label={`IP Address (Current: ${hostData?.getAddress()})`}
                    helperText={"IP v4/v6 Address"}
                    name="address"
                    error={!!errors.address}
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    style={{
                      width: "10vh",
                      height: "3vh",
                      marginLeft: "3vh",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Set
                  </Button>
                </FormControl>
              </form>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
