import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Checks } from "../util/serviceDefaultProperties";
import Button from "@material-ui/core/Button";
import {
  GetAllRequest as GetAllRequestServiceGroup,
  ServiceGroup,
} from "../../../lib/scoretrakapis/scoretrak/service_group/v1/service_group_pb";
import { Severity } from "../../../types/types";
import {
  GetAllRequest as GetAllRequestService,
  StoreRequest,
} from "../../../lib/scoretrakapis/scoretrak/service/v1/service_pb";
import {
  GetAllRequest as GetAllRequestHost,
  Host,
} from "../../../lib/scoretrakapis/scoretrak/host/v1/host_pb";
import { HostGroup } from "../../../lib/scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../../SnackbarDismissButton";
import { gRPCClients } from "../../../grpc/gRPCClients";
import { IServiceToService } from "../../../lib/material-table/services";
import { IService } from "../../../types/material_table";

const ServiceCreate = () => {
  const [dt, setData] = useState<{
    loaderHost: boolean;
    loaderHostGroup: boolean;
    hosts: Host[];
    hostGroups: HostGroup[];
    serviceGroups: ServiceGroup[];
  }>({
    loaderHost: true,
    loaderHostGroup: true,
    hosts: [],
    hostGroups: [],
    serviceGroups: [],
  });
  const [counter, setCounter] = useState<Record<string, number>>({});
  const [rowsData, setRowData] = useState<
    Record<string, Record<number, IService>>
  >({});
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { id: "name", label: "Name of the Check(Ex: PING, SSH)" },
    { id: "displayName", label: "Display Name" },
    { id: "weight", label: "Weight" },
    { id: "pointsBoost", label: "Points Boost" },
    { id: "roundUnits", label: "Round Units" },
    { id: "roundDelay", label: "Round Delay" },
    { id: "serviceGroupId", label: "Service Group" },
  ];

  const defaultVals: IService = {
    name: "",
    displayName: "",
    weight: 1,
    pointsBoost: 0,
    roundUnits: 1,
    roundDelay: 0,
    serviceGroupId: undefined,
    pause: false,
    hide: false,
    hostId: undefined,
    id: undefined,
  };

  useEffect(() => {
    gRPCClients.serviceGroupClient.getAll(new GetAllRequestService(), {}).then(
      (respServiceGrp) => {
        setData((prevState) => {
          return {
            ...prevState,
            loader: false,
            serviceGroups: respServiceGrp.getServiceGroupsList(),
          };
        });
      },
      (err: any) => {
        enqueueSnackbar(
          `Encountered an error while retrieving Service Groups: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
    gRPCClients.hostGroupClient
      .getAll(new GetAllRequestServiceGroup(), {})
      .then(
        (respHostGroup) => {
          const counter: Record<string, number> = {};
          const rowdt: Record<string, IService[]> = {};
          respHostGroup.getHostGroupsList().forEach((hstGrp) => {
            counter[hstGrp.getId()?.getValue() as string] = 0;
            rowdt[hstGrp.getId()?.getValue() as string] = [];
          });
          setCounter(counter);
          setRowData(rowdt);
          setData((prevState) => {
            return {
              ...prevState,
              loaderHostGroup: false,
              hostGroups: respHostGroup.getHostGroupsList(),
            };
          });
        },
        (err: any) => {
          enqueueSnackbar(
            `Encountered an error while retrieving Host Groups: ${err.message}. Error code: ${err.code}`,
            { variant: Severity.Error, action: SnackbarDismissButton }
          );
        }
      );

    gRPCClients.hostClient.getAll(new GetAllRequestHost(), {}).then(
      (respHost) => {
        setData((prevState) => {
          return {
            ...prevState,
            loaderHost: false,
            hosts: respHost.getHostsList(),
          };
        });
      },
      (err: any) => {
        enqueueSnackbar(
          `Encountered an error while retrieving Host: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }, []);

  const setNumberOfServices = (hostGroupID: string, value: number) => {
    if (value >= 0) {
      setRowData((prevState) => {
        const newRowData: IService[] = [];
        for (let i = 1; i <= value; i++) {
          if (i in prevState[hostGroupID]) {
            newRowData[i] = prevState[hostGroupID][i];
          } else {
            newRowData[i] = defaultVals;
          }
        }
        return { ...prevState, [hostGroupID]: newRowData };
      });
      setCounter((prevState) => {
        return { ...prevState, [hostGroupID]: value };
      });
    }
  };

  function submit() {
    const services: IService[] = [];
    Object.keys(rowsData).forEach((hostGroupID) => {
      Object.keys(rowsData[hostGroupID]).forEach((idx) => {
        dt.hosts.forEach((host) => {
          if (hostGroupID === host.getHostGroupId()?.getValue()) {
            services.push({
              ...rowsData[hostGroupID][Number(idx)],
              hostId: host.getId()?.getValue(),
            });
          }
        });
      });
    });

    const storeRequest = new StoreRequest();

    services.forEach((servVals) => {
      storeRequest.addServices(IServiceToService(servVals));
    });

    gRPCClients.serviceClient.store(storeRequest, {}).then(
      (_) => {
        enqueueSnackbar("Success!", {
          variant: Severity.Success,
          autoHideDuration: 3000,
        });
      },
      (err: any) => {
        enqueueSnackbar(
          `Failed to save services: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }

  return (
    <>
      <div>
        {!dt.loaderHostGroup && !dt.loaderHost ? (
          dt.hostGroups.map((table) => (
            <>
              <Typography>Services for: {table.getName()}</Typography>
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ marginBottom: "4vh" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TextField
                        label="#"
                        helperText="Number of services"
                        type="number"
                        value={counter[table.getId()?.getValue() as string]}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (!isNaN(Number(event.target.value))) {
                            setNumberOfServices(
                              table.getId()?.getValue() as string,
                              Number(event.target.value)
                            );
                          }
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.apply(
                    null,
                    Array(counter[table.getId()?.getValue() as string])
                  ).map((e, j) => {
                    const i = j + 1;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`${table.getId()?.getValue()}_${i}`}
                      >
                        <TableCell
                          key={`${table.getId()?.getValue() as string}_${i}`}
                        >
                          {i}
                        </TableCell>

                        {columns.map((column) => (
                          <TableCell>
                            {column.id === "name" && (
                              <Select
                                id={`${table.getId()?.getValue()}_${i}_${
                                  column.id
                                }`}
                                value={
                                  rowsData[
                                    table.getId()?.getValue() as string
                                  ] &&
                                  rowsData[table.getId()?.getValue() as string][
                                    i
                                  ] &&
                                  rowsData[table.getId()?.getValue() as string][
                                    i
                                  ][column.id]
                                }
                                onChange={(event) => {
                                  const val = String(event.target.value);
                                  setRowData((prevState) => {
                                    return {
                                      ...prevState,
                                      [table.getId()?.getValue() as string]: {
                                        ...prevState[
                                          table.getId()?.getValue() as string
                                        ],
                                        [i]: {
                                          ...prevState[
                                            table.getId()?.getValue() as string
                                          ][i],
                                          name: val,
                                          displayName: prevState[
                                            table.getId()?.getValue() as string
                                          ][i].displayName
                                            ? prevState[
                                                table
                                                  .getId()
                                                  ?.getValue() as string
                                              ][i].displayName
                                            : `${table.getName()}: ${val}`,
                                        },
                                      },
                                    };
                                  });
                                }}
                              >
                                {Object.keys(Checks).map((serviceName) => {
                                  return (
                                    <MenuItem value={serviceName}>
                                      {serviceName}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}

                            {column.id === "serviceGroupId" && (
                              <Select
                                id={`${table.getId()?.getValue()}_${i}_${
                                  column.id
                                }`}
                                value={
                                  rowsData[
                                    table.getId()?.getValue() as string
                                  ] &&
                                  rowsData[table.getId()?.getValue() as string][
                                    i
                                  ] &&
                                  rowsData[table.getId()?.getValue() as string][
                                    i
                                  ][column.id]
                                }
                                onChange={(event) => {
                                  const val = event.target.value;
                                  setRowData((prevState) => {
                                    return {
                                      ...prevState,
                                      [table.getId()?.getValue() as string]: {
                                        ...prevState[
                                          table.getId()?.getValue() as string
                                        ],
                                        [i]: {
                                          ...prevState[
                                            table.getId()?.getValue() as string
                                          ][i],
                                          [column.id]: val,
                                        },
                                      },
                                    };
                                  });
                                }}
                              >
                                {dt.serviceGroups.map((servGroup) => {
                                  return (
                                    <MenuItem
                                      value={servGroup.getId()?.getValue()}
                                    >
                                      {servGroup.getName()}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}

                            {column.id !== "serviceGroupId" &&
                              column.id !== "name" && (
                                <TextField
                                  id={`${table.getId()?.getValue()}_${i}_${
                                    column.id
                                  }`}
                                  type={
                                    column.id === "weight" ||
                                    column.id === "pointsBoost" ||
                                    column.id === "roundUnits" ||
                                    column.id === "roundDelay"
                                      ? "number"
                                      : undefined
                                  }
                                  value={
                                    rowsData[
                                      table.getId()?.getValue() as string
                                    ] &&
                                    rowsData[
                                      table.getId()?.getValue() as string
                                    ][i] &&
                                    rowsData[
                                      table.getId()?.getValue() as string
                                    ][i][column.id as keyof IService]
                                  }
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    let val: number | string =
                                      event.target.value;
                                    if (
                                      column.id === "weight" ||
                                      column.id === "pointsBoost" ||
                                      column.id === "roundUnits" ||
                                      column.id === "roundDelay"
                                    ) {
                                      val = parseInt(event.target.value);
                                    }
                                    setRowData((prevState) => {
                                      return {
                                        ...prevState,
                                        [table.getId()?.getValue() as string]: {
                                          ...prevState[
                                            table.getId()?.getValue() as string
                                          ],
                                          [i]: {
                                            ...prevState[
                                              table
                                                .getId()
                                                ?.getValue() as string
                                            ][i],
                                            [column.id]: val,
                                          },
                                        },
                                      };
                                    });
                                  }}
                                />
                              )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ))
        ) : (
          <Box height="100%" width="100%" m="auto">
            <CircularProgress />
          </Box>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={submit}
          variant="contained"
          style={{ marginRight: "8px", marginTop: "8px" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ServiceCreate;
