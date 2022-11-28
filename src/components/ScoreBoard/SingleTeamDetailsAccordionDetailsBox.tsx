import { Service as SimpleService } from "~/types/report";
import { useSnackbar } from "notistack";
import { useReportQuery } from "~/lib/queries/reports";
import MaterialTable, { Column, MTableToolbar } from "@material-table/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import {
  GetAllByServiceIDRequest as GetAllByServiceIDRequestCheck,
  GetAllByServiceIDResponse as GetAllByServiceIDResponseCheck,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/check/v1/check_pb";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import { gRPCClients } from "~/grpc/gRPCClients";
import {
  GetAllByServiceIDRequest as GetAllByServiceIDRequestProperty,
  GetAllByServiceIDResponse as GetAllByServiceIDResponseProperty,
  Property,
  Status,
  UpdateRequest as UpdateRequestProperty,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/property/v1/property_pb";
import {
  GetByIDRequest as GetByIDRequestHost,
  Host,
  UpdateRequest as UpdateRequestHost,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host/v1/host_pb";
import { Severity } from "~/types/types";
import { SnackbarDismissButton } from "~/components/SnackbarDismissButton";
import { Fragment, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { IconButton, Tooltip } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { SingleCheckDetails, useStyles } from "./SingleTeamDetails";

type SingleTeamDetailsAccordionDetailsBoxProps = {
  simpleService: SimpleService;
  PropertiesData: PropertiesData[];
  setPropertiesData: React.Dispatch<React.SetStateAction<PropertiesData[]>>;
  service_id: string;
  history: Record<string, SingleCheckDetails[]>;
  setHistory: React.Dispatch<
    React.SetStateAction<Record<string, SingleCheckDetails[]>>
  >;
  host_id: string;
  setHostData: React.Dispatch<React.SetStateAction<HostData | undefined>>;
  hostData: HostData | undefined;
};
export type HostData = {
  address: string;
  edit_host: boolean;
};
export type PropertiesData = {
  key: string;
  value_used: string;
  service_id: string;
  value: undefined | string;
  editable_value: boolean;
};

export function SingleTeamDetailsAccordionDetailsBox(
  props: SingleTeamDetailsAccordionDetailsBoxProps
) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: reportData, isLoading: reportIsLoading } = useReportQuery();

  const simpleService = props.simpleService;
  const PropertiesData = props.PropertiesData;
  const classes = useStyles();
  const setPropertiesData = props.setPropertiesData;
  const service_id = props.service_id;
  const history = props.history;
  const setHistory = props.setHistory;
  const host_id = props.host_id;

  const columns: Array<Column<PropertiesData>> = [
    { title: "Key", field: "key", editable: "never" as const },
    { title: "Value Used", field: "value_used", editable: "never" as const },
    { title: "Current Value", field: "value", emptyValue: "(empty)" },
    { title: "editable_value", field: "status", hidden: true },
  ];

  const columnsPreviousRounds = [
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

  async function reloadPreviousChecks(
    service: string
  ): Promise<GetAllByServiceIDResponseCheck> {
    const checksRequest = new GetAllByServiceIDRequestCheck();
    const uuid = new UUID();
    uuid.setValue(service);
    checksRequest.setServiceId(uuid);
    return gRPCClients.check.v1.checkServicePromiseClient.getAllByServiceID(
      checksRequest,
      {}
    );
  }

  async function reloadProperties(
    service: string
  ): Promise<GetAllByServiceIDResponseProperty> {
    const propertiesRequest = new GetAllByServiceIDRequestProperty();
    const uuid = new UUID();
    uuid.setValue(service);
    propertiesRequest.setServiceId(uuid);
    return gRPCClients.property.v1.propertyServicePromiseClient.getAllByServiceID(
      propertiesRequest,
      {}
    );
  }

  async function reloadHost(hostID: string) {
    const hostsRequest = new GetByIDRequestHost();
    const uuid = new UUID();
    uuid.setValue(hostID);
    hostsRequest.setId(uuid);
    return gRPCClients.host.v1.hostServicePromiseClient.getByID(
      hostsRequest,
      {}
    );
  }

  function reloadPropertiesSetter(
    service_id: string,
    simpleService: SimpleService
  ) {
    reloadProperties(service_id).then(
      (results) => {
        const d: PropertiesData[] = [];
        for (const [key, property] of Object.entries(
          simpleService.Properties
        )) {
          const obj: PropertiesData = {
            key,
            value_used: property.Value,
            service_id: key,
            value: "",
            editable_value: false,
          };
          results.getPropertiesList().forEach((res) => {
            if (
              key === res.getKey() &&
              res.getStatus() === Status.STATUS_EDIT
            ) {
              obj.value = res.getValue()?.getValue()
                ? res.getValue()?.getValue()
                : undefined;
              obj.editable_value = true;
            }
          });
          d.push(obj);
        }
        setPropertiesData(d);
      },
      (err: any) => {
        enqueueSnackbar(
          `Encountered an error while loading properties for service ${service_id}: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }

  const handleSetHostAddress = (
    e: React.FormEvent<EventTarget>,
    hstID: string
  ) => {
    e.preventDefault();
    const address = (
      document.getElementById(`host_address_${hstID}`) as HTMLInputElement
    ).value;
    const hostsRequest = new UpdateRequestHost();
    const uuid = new UUID();
    uuid.setValue(hstID);
    const host = new Host();
    host.setId(uuid);
    host.setAddress(address);
    hostsRequest.setHost(host);
    gRPCClients.host.v1.hostServicePromiseClient.update(hostsRequest, {}).then(
      (r) => {
        props.setHostData({ edit_host: true, address });
        reloadHostSetter(hstID);
      },
      (err: any) => {
        enqueueSnackbar(
          `Failed to update host details ${hstID}: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  };

  function reloadHostSetter(host_id: string) {
    reloadHost(host_id).then(
      (results) => {
        if (results.getHost() === undefined) {
          props.setHostData(undefined);
        }
        props.setHostData({
          address: results.getHost()?.getAddress() as string,
          edit_host: results.getHost()?.getEditHost()?.getValue() as boolean,
        });
      },
      (err: any) => {
        enqueueSnackbar(
          `Encountered an error while loading host ${host_id}: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }

  useEffect(() => {
    if (!history[service_id]) {
      reloadPreviousChecks(service_id).then(
        (results) => {
          const d: SingleCheckDetails[] = [];
          results.getChecksList().forEach((res) => {
            if (reportData && res.getRoundId().valueOf() < reportData.Round) {
              d.push({
                service_id,
                round_id: res.getRoundId().valueOf(),
                passed: res.getPassed()?.getValue() as boolean,
                log: res.getLog(),
                err: res.getErr(),
                host_id,
                pause: false,
              });
            }
          });
          setHistory((prevState) => {
            return { ...prevState, [service_id]: d };
          });
        },
        (err: any) => {
          enqueueSnackbar(
            `Encountered an error while loading previous checks: ${err.message}. Error code: ${err.code}`,
            { variant: Severity.Error, action: SnackbarDismissButton }
          );
        }
      );
    }
    reloadHostSetter(host_id);
    reloadPropertiesSetter(service_id, simpleService);
  });

  return (
    <Box width="100%" bgcolor="background.paper" textAlign="left">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {simpleService.Check?.Log && (
            <Alert severity={simpleService.Check?.Passed ? "info" : "warning"}>
              <AlertTitle>Response</AlertTitle>
              {simpleService.Check?.Log}
            </Alert>
          )}
          <br />
          {simpleService.Check?.Err && (
            <Alert severity="error">
              <AlertTitle>Error Details</AlertTitle>
              {simpleService.Check?.Err}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MaterialTable
            options={{ pageSizeOptions: [5, 10, 20, 50, 100], pageSize: 5 }}
            title="Previous Rounds"
            columns={columnsPreviousRounds}
            data={history[service_id]}
          />
        </Grid>
        <Grid item xs={6}>
          {PropertiesData.length !== 0 && (
            <Fragment>
              <MaterialTable
                options={{
                  pageSizeOptions: [3, 5, 10, 20, 50, 100],
                  pageSize: PropertiesData.length,
                  emptyRowsWhenPaging: false,
                }} //
                title="Properties"
                columns={columns}
                data={PropertiesData}
                cellEditable={{
                  isCellEditable: (rowData, columnDef) => {
                    return rowData.editable_value;
                  },
                  onCellEditApproved: (
                    newValue,
                    oldValue,
                    rowData,
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
                        uuid.setValue(service_id);
                        property.setServiceId(uuid);
                        const stringValue = new StringValue();
                        stringValue.setValue(newValue);
                        property.setValue(stringValue);
                        const updatedProperty = new UpdateRequestProperty();
                        updatedProperty.setProperty(property);
                        gRPCClients.property.v1.propertyServicePromiseClient
                          .update(updatedProperty, {})
                          .then(
                            (r) => {
                              setPropertiesData((prevState) => {
                                return prevState.map((property) => {
                                  if (property.key === rowData.key) {
                                    return {
                                      ...rowData,
                                      value: newValue ? newValue : undefined,
                                    };
                                  }
                                  return { ...property };
                                });
                              });
                              resolve();
                            },
                            (err: any) => {
                              enqueueSnackbar(
                                `Encountered an error while loading previous checks: ${err.message}. Error code: ${err.code}`,
                                {
                                  variant: Severity.Error,
                                  action: SnackbarDismissButton,
                                }
                              );
                              reject();
                            }
                          );
                      }, 600);
                    });
                  },
                }}
                components={{
                  Toolbar: (props) => {
                    const propsCopy = { ...props };
                    return (
                      <Grid container direction="row">
                        <Grid item xs={1}>
                          <Box pl={1} pt={1}>
                            <Tooltip title="reload current values">
                              <IconButton
                                onClick={() =>
                                  reloadPropertiesSetter(
                                    service_id,
                                    simpleService
                                  )
                                }
                                aria-label="reload properties"
                                color="primary"
                              >
                                <Replay />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Grid>
                        <Grid item xs={11}>
                          <MTableToolbar {...propsCopy} />
                        </Grid>
                      </Grid>
                    );
                  },
                }}
              />
            </Fragment>
          )}
          {props.hostData && props.hostData.edit_host && (
            <form
              style={{ width: "100%", marginTop: "1vh" }}
              onSubmit={(e) => {
                handleSetHostAddress(e, host_id);
              }}
            >
              <FormControl
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div>
                  <InputLabel htmlFor="host_address">
                    Host (Current: {props.hostData.address})
                  </InputLabel>
                  <Input
                    id={`host_address_${host_id}`}
                    aria-describedby="my-helper-text"
                  />
                  <FormHelperText id="my-helper-text">
                    Set the address of the remote machine
                  </FormHelperText>
                </div>
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
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
