import React, { useEffect } from "react";
import { forwardRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { SetupProps } from "../util/util";
import { Team } from "@scoretrak/scoretrakapis/scoretrak/team/v1/team_pb";
import { HostGroup } from "@scoretrak/scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import { GetAllRequest as GetAllRequestHostGroup } from "@scoretrak/scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import { GetAllRequest as GetAllRequestTeam } from "@scoretrak/scoretrakapis/scoretrak/team/v1/team_pb";
import { Severity } from "../../../types/types";
import { StoreRequest } from "@scoretrak/scoretrakapis/scoretrak/host/v1/host_pb";
import { defaultHostColumns, hostColumns, hostColumnsToHost } from "./HostMenu";
import { teamToTeamColumn } from "../Team/TeamMenu";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}
function getKeyValue<T>(obj: Record<string, T>, key: string) {
  return obj[key];
}

type valueof<T> = T[keyof T];
type templateState = {
  hideTemplate: boolean;
  pauseTemplate: boolean;
  edit_hostTemplate: boolean;
};
const HostCreate = forwardRef((props: SetupProps, ref) => {
  const [dt, setData] = React.useState<{
    loaderTeam: boolean;
    loaderHostGroup: boolean;
    teams: Team[];
    hostGroups: HostGroup[];
    hostGroupsTemplateState: templateState[];
  }>({
    loaderTeam: true,
    loaderHostGroup: true,
    teams: [],
    hostGroups: [],
    hostGroupsTemplateState: [],
  });
  const [rowsData, setRowData] = React.useState<Record<string, hostColumns>>(
    {}
  );
  useEffect(() => {
    props.gRPCClients.teamClient.getAll(new GetAllRequestTeam(), {}).then(
      (respTeam) => {
        setData((prevState) => {
          return {
            ...prevState,
            loaderTeam: false,
            teams: respTeam.getTeamsList().sort((a, b) => {
              const aidx = a.getIndex()?.getValue();
              const bidx = b.getIndex()?.getValue();
              if (!aidx) {
                return -1;
              } else if (!bidx) {
                return 1;
              } else {
                return aidx > bidx ? 1 : -1;
              }
            }),
          };
        });
      },
      (err: any) => {
        props.genericEnqueue(
          `Encountered an error while retrieving Teams: ${err.message}. Error code: ${err.code}`,
          Severity.Error
        );
      }
    );
    props.gRPCClients.hostGroupClient
      .getAll(new GetAllRequestHostGroup(), {})
      .then(
        (respHostGroup) => {
          setData((prevState) => {
            const hostGroupsTemplateState: templateState[] = [];
            respHostGroup.getHostGroupsList().forEach((hstGrp) => {
              hostGroupsTemplateState.push({
                edit_hostTemplate: !!defaultHostColumns().editHost,
                pauseTemplate: !!defaultHostColumns().pause,
                hideTemplate: !!defaultHostColumns().hide,
              });
            });
            return {
              ...prevState,
              hostGroups: respHostGroup.getHostGroupsList(),
              hostGroupsTemplateState,
              loaderHostGroup: false,
            };
          });
        },
        (err: any) => {
          props.genericEnqueue(
            `Encountered an error while retrieving Host Groups: ${err.message}. Error code: ${err.code}`,
            Severity.Error
          );
        }
      );
  }, []);

  const modifyRowDataProperty = (
    val: valueof<hostColumns>,
    hostGroup: HostGroup,
    team: Team,
    hostKey: keyof hostColumns
  ) => {
    setRowData((prevState) => {
      const newState = { ...prevState };
      const cell = `${team.getId()?.getValue()}_${hostGroup
        .getId()
        ?.getValue()}`;
      if (!(cell in newState)) {
        newState[cell] = defaultHostColumns();
        newState[cell].teamId = team.getId()?.getValue();
        newState[cell].hostGroupId = hostGroup.getId()?.getValue();
      }
      setProperty(newState[cell], hostKey, val);
      return { ...newState };
    });
  };

  const templateModification = (
    hostGroupId: string,
    template: valueof<hostColumns>,
    hostProperty: keyof hostColumns
  ) => {
    const matched_index: string[] = [];
    if (typeof template == "string") {
      const re = new RegExp("(?<={).*?(?=})", "g");
      let match;
      while ((match = re.exec(template)) != null) {
        if (match[0] === "") {
          break;
        }
        matched_index.push(match[0]);
      }
    }

    setRowData((prevState) => {
      const newState = { ...prevState };
      for (let i = 0; i < dt.teams.length; i++) {
        if (dt.teams[i].getIndex()?.getValue()) {
          const cell = `${dt.teams[i].getId()?.getValue()}_${hostGroupId}`;
          if (!(cell in newState)) {
            newState[cell] = defaultHostColumns();
            newState[cell].teamId = dt.teams[i].getId()?.getValue();
            newState[cell].hostGroupId = hostGroupId;
          }
          const tmColumn = teamToTeamColumn(dt.teams[i]);
          setProperty(newState[cell], hostProperty, template);
          if (typeof template == "string" && matched_index.length !== 0) {
            let templateCopy = template;
            matched_index.forEach((t) => {
              if (t in tmColumn) {
                templateCopy = templateCopy.replace(
                  `{${t}}`,
                  String(getKeyValue(tmColumn, t))
                );
              } else {
                props.genericEnqueue(
                  `Entered templated value does not exist. Supported values from parent Team object: ${Object.keys(
                    tmColumn
                  ).toString()}`,
                  Severity.Warning
                );
                return { ...prevState };
              }
            });
            setProperty(newState[cell], hostProperty, templateCopy);
          }
        }
      }
      return { ...newState };
    });
  };

  function submit() {
    const storeRequest = new StoreRequest();
    let elements_skipped: boolean = false;
    Object.keys(rowsData).forEach((teamHostGrpId) => {
      if (rowsData[teamHostGrpId].address !== "") {
        storeRequest.addHosts(hostColumnsToHost(rowsData[teamHostGrpId]));
      } else {
        elements_skipped = true;
      }
    });
    if (elements_skipped) {
      props.genericEnqueue(
        "Elements with empty Address filed were skipped",
        Severity.Warning
      );
    }

    props.gRPCClients.hostClient.store(storeRequest, {}).then(
      (r) => {
        props.genericEnqueue("Success!", Severity.Success, 3000);
      },
      (err: any) => {
        props.genericEnqueue(
          `Encountered an error while Storing Hosts: ${err.message}. Error code: ${err.code}`,
          Severity.Error
        );
      }
    );
  }

  return (
    <React.Fragment>
      <div>
        {!dt.loaderTeam && !dt.loaderHostGroup ? (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                {dt.hostGroups.map((column) => (
                  <TableCell>{column.getName()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>Templates</TableCell>
                {dt.hostGroups.map((column, column_idx) => (
                  <TableCell>
                    <TextField
                      label="Address"
                      id={`id_${column.getId()?.getValue()}_address`}
                      helperText="Ex. 10.1.{index}.1"
                      onChange={(event) => {
                        templateModification(
                          column.getId()?.getValue() as string,
                          event.target.value,
                          "address"
                        );
                      }}
                    />
                    <TextField
                      label="Allowed Range"
                      id={`id_${column.getId()?.getValue()}_allowed_range`}
                      helperText="Ex.10.1.{index}.1"
                      onChange={(event) => {
                        templateModification(
                          column.getId()?.getValue() as string,
                          event.target.value,
                          "addressListRange"
                        );
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id={`id_${column.getId()?.getValue()}_hide`}
                          checked={
                            dt.hostGroupsTemplateState[column_idx].hideTemplate
                          }
                          onChange={(event) => {
                            const val = event.target.checked;
                            setData((prevState) => {
                              const newState = { ...prevState };
                              newState.hostGroupsTemplateState[
                                column_idx
                              ].hideTemplate = val;
                              return { ...newState };
                            });
                            templateModification(
                              column.getId()?.getValue() as string,
                              event.target.checked,
                              "hide"
                            );
                          }}
                        />
                      }
                      label="Hide Host from scoring"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id={`id_${column.getId()?.getValue()}_pause`}
                          checked={
                            dt.hostGroupsTemplateState[column_idx].pauseTemplate
                          }
                          onChange={(event) => {
                            const val = event.target.checked;
                            setData((prevState) => {
                              const newState = { ...prevState };
                              newState.hostGroupsTemplateState[
                                column_idx
                              ].pauseTemplate = val;
                              return { ...newState };
                            });
                            templateModification(
                              column.getId()?.getValue() as string,
                              event.target.checked,
                              "pause"
                            );
                          }}
                        />
                      }
                      label="Pause Host Scoring"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id={`id_${column.getId()?.getValue()}_edit_host`}
                          checked={
                            dt.hostGroupsTemplateState[column_idx]
                              .edit_hostTemplate
                          }
                          onChange={(event) => {
                            const val = event.target.checked;
                            setData((prevState) => {
                              const newState = { ...prevState };
                              newState.hostGroupsTemplateState[
                                column_idx
                              ].edit_hostTemplate = val;
                              return { ...newState };
                            });
                            templateModification(
                              column.getId()?.getValue() as string,
                              event.target.checked,
                              "editHost"
                            );
                          }}
                        />
                      }
                      label="Allow Changing Hostname"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dt.teams.map((row, row_idx) => {
                if (row.getIndex()?.getValue()) {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={row.getName()}>
                        {row.getName()}
                        <IconButton
                          onClick={() => {
                            setData((prevState) => {
                              const newData = { ...prevState };
                              newData.teams.splice(row_idx, 1);
                              return { ...newData };
                            });
                            setRowData((prevState) => {
                              const newData = { ...prevState };
                              const toDelete: string[] = [];
                              Object.keys(newData).forEach((key) => {
                                if (
                                  key.includes(
                                    row.getId()?.getValue() as string
                                  )
                                ) {
                                  toDelete.push(key);
                                }
                              });
                              toDelete.forEach((key) => delete newData[key]);
                              return { ...newData };
                            });
                          }}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>

                      {dt.hostGroups.map((column) => {
                        const cell = `${row.getId()?.getValue()}_${column
                          .getId()
                          ?.getValue()}`;
                        return (
                          <TableCell color="secondary">
                            <TextField
                              label="Address"
                              id={`${cell}_address`}
                              value={rowsData[cell]?.address || ""}
                              onChange={(event) => {
                                const val = event.target.value;
                                modifyRowDataProperty(
                                  val,
                                  column,
                                  row,
                                  "address"
                                );
                              }}
                            />
                            <TextField
                              label="Address Range"
                              id={`${cell}_allowed_range`}
                              value={rowsData[cell]?.addressListRange || ""}
                              onChange={(event) => {
                                const val = event.target.value;
                                modifyRowDataProperty(
                                  val,
                                  column,
                                  row,
                                  "addressListRange"
                                );
                              }}
                            />
                            <Grid container>
                              <Grid item xs={8}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id={`id_${column
                                        .getId()
                                        ?.getValue()}_enable`}
                                      checked={
                                        rowsData[cell]
                                          ? rowsData[cell].hide
                                          : defaultHostColumns().hide
                                      }
                                      onChange={(event) => {
                                        const val = event.target.checked;
                                        modifyRowDataProperty(
                                          val,
                                          column,
                                          row,
                                          "hide"
                                        );
                                      }}
                                    />
                                  }
                                  label="Hide"
                                />
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id={`id_${column
                                        .getId()
                                        ?.getValue()}_enable`}
                                      checked={
                                        rowsData[cell]
                                          ? rowsData[cell].pause
                                          : defaultHostColumns().pause
                                      }
                                      onChange={(event) => {
                                        const val = event.target.checked;
                                        modifyRowDataProperty(
                                          val,
                                          column,
                                          row,
                                          "pause"
                                        );
                                      }}
                                    />
                                  }
                                  label="Pause"
                                />
                                <br />
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id={`id_${column
                                        .getId()
                                        ?.getValue()}_edit_host`}
                                      checked={
                                        rowsData[cell]
                                          ? rowsData[cell].editHost
                                          : defaultHostColumns().editHost
                                      }
                                      onChange={(event) => {
                                        const val = event.target.checked;
                                        modifyRowDataProperty(
                                          val,
                                          column,
                                          row,
                                          "editHost"
                                        );
                                      }}
                                    />
                                  }
                                  label="Edit Hostname"
                                />
                              </Grid>
                              <Grid item xs={4}>
                                {cell in rowsData && (
                                  <IconButton
                                    onClick={() => {
                                      setRowData((prevState) => {
                                        const newData = { ...prevState };
                                        delete newData[cell];
                                        return { ...newData };
                                      });
                                    }}
                                    aria-label="delete"
                                    size="large"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
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
    </React.Fragment>
  );
});

export default HostCreate;
