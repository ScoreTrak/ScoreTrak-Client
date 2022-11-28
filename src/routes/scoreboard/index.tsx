import { useTitle } from "react-use";
import { usePolicy } from "../../contexts/PolicyContext";
import { useReport } from "../../contexts/ReportContext";
import { CircularProgress, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { Service } from "../../types/report";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { token } from "../../grpc/token/token";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { usePolicyQuery } from "~/lib/queries/policies";
import { useReportQuery } from "~/lib/queries/reports";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  tableNavigator: {
    marginRight: "3vh",
    marginLeft: "3vh",
  },
});

export default function Scoreboard() {
  useTitle("Status");
  const policy = usePolicy();
  const report = useReport();
  const theme = useTheme();
  const classes = useStyles();
  const [rowPage, setRowPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [dense, setDense] = useState<boolean>(true);
  const [hideAddresses, setHideAddresses] = useState<boolean>(true);
  const [highlightParentTeam, setHighlightParentTeam] = useState<boolean>(true);

  const { data: policyData, isLoading: policyIsLoading } = usePolicyQuery();
  const { data: reportData, isLoading: reportIsLoading } = useReportQuery();

  const toggleHideAddresses = () => {
    setHideAddresses((prevState) => !prevState);
  };

  const toggleHighlightParentTeam = () => {
    setHighlightParentTeam((prevState) => !prevState);
  };

  const toggleChangeDense = () => {
    setDense((prevState) => !prevState);
  };

  const handleRowChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setRowPage(page);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: React.ReactText };
  }) => {
    setRowsPerPage(Number(event.target.value));
    setRowPage(0);
  };

  const [columnPage, setColumnPage] = useState(0);
  const [columnsPerPage, setColumnsPerPage] = useState(25);
  const handleColumnChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setColumnPage(page);
  };
  const handleChangeColumnsPerPage = (event: {
    target: { value: React.ReactText };
  }) => {
    setColumnsPerPage(Number(event.target.value));
    setColumnPage(0);
  };

  const teamNamesSet = new Set<string>();
  const data: Record<
    string,
    Record<string, Service & { Address: string }>
  > = {};
  const dataKeys = new Set<string>();
  if (reportData && "Teams" in reportData) {
    for (const team in reportData.Teams) {
      if (reportData.Teams.hasOwnProperty(team)) {
        data[reportData.Teams[team].Name] = {};
        for (const host in reportData.Teams[team].Hosts) {
          if (reportData.Teams[team].Hosts.hasOwnProperty(host)) {
            if (
              Object.keys(reportData.Teams[team].Hosts[host].Services)
                .length !== 0
            ) {
              for (const service in reportData.Teams[team].Hosts[host]
                .Services) {
                if (
                  reportData.Teams[team].Hosts[host].Services.hasOwnProperty(
                    service
                  )
                ) {
                  const hst = reportData.Teams[team].Hosts[host];
                  const sr = hst.Services[service];
                  let keyName = "";
                  if (sr.DisplayName) {
                    keyName = sr.DisplayName;
                  } else {
                    if (hst.HostGroup != null) {
                      keyName = hst.HostGroup.Name + "-" + sr.Name;
                    } else {
                      keyName = sr.Name;
                    }
                  }

                  data[reportData.Teams[team].Name][keyName] = {
                    ...sr,
                    Address: reportData.Teams[team].Hosts[host].Address,
                    Pause:
                      reportData.Teams[team].Pause ||
                      (hst.HostGroup != null ? hst.HostGroup.Pause : false) ||
                      hst.Pause ||
                      sr.Pause,
                  };

                  dataKeys.add(keyName);
                  teamNamesSet.add(reportData.Teams[team].Name);
                }
              }
            }
          }
        }
      }
    }
  }
  const dataKeysArray = Array.from(dataKeys);
  const teamNames = Array.from(teamNamesSet);
  dataKeysArray.sort();

  const collator = new Intl.Collator([], { numeric: true });
  teamNames.sort((a, b) => collator.compare(a, b));

  return (
    <>
      {reportData && reportData.Round !== 0 ? (
        <TableContainer>
          <Table
            stickyHeader
            aria-label="sticky table"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Team Name</TableCell>

                {dataKeysArray
                  .slice(
                    columnPage * columnsPerPage,
                    columnPage * columnsPerPage + columnsPerPage
                  )
                  .map((column) => (
                    <TableCell
                      width={`${
                        100 /
                        dataKeysArray.slice(
                          columnPage * columnsPerPage,
                          columnPage * columnsPerPage + columnsPerPage
                        ).length
                      }%`}
                      align="center"
                      key={column}
                    >
                      {column}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {teamNames
                .slice(
                  rowPage * rowsPerPage,
                  rowPage * rowsPerPage + rowsPerPage
                )
                .map((name) => {
                  return (
                    <TableRow hover tabIndex={-1} key={name}>
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {name}
                      </TableCell>
                      {dataKeysArray
                        .slice(
                          columnPage * columnsPerPage,
                          columnPage * columnsPerPage + columnsPerPage
                        )
                        .map((column) => (
                          <TableCell
                            key={name + column}
                            width={`${
                              100 /
                              dataKeysArray.slice(
                                columnPage * columnsPerPage,
                                columnPage * columnsPerPage + columnsPerPage
                              ).length
                            }%`}
                            style={(() => {
                              if (data[name][column]) {
                                let style = {};
                                if (theme.palette.type === "dark") {
                                  if (data[name][column].Pause) {
                                    style = { backgroundColor: "#000000" };
                                  } else if (
                                    data[name][column].Check != null &&
                                    data[name][column].Check?.Passed
                                  ) {
                                    style = { backgroundColor: "#259B0B" };
                                  } else {
                                    style = {
                                      backgroundColor: "#d20c23",
                                      color: "white",
                                    };
                                  }
                                } else {
                                  if (data[name][column].Pause) {
                                    style = { backgroundColor: "#000000" };
                                  } else if (
                                    data[name][column].Check != null &&
                                    data[name][column].Check?.Passed
                                  ) {
                                    style = { backgroundColor: "green" };
                                  } else {
                                    style = {
                                      backgroundColor: "red",
                                      color: "white",
                                    };
                                  }
                                }
                                const teamId = token.getCurrentTeamID();

                                if (
                                  reportData &&
                                  !reportIsLoading &&
                                  token.isAValidToken() &&
                                  teamId != null &&
                                  teamId in reportData.Teams &&
                                  reportData.Teams[teamId].Name === name &&
                                  highlightParentTeam
                                ) {
                                  style = {
                                    ...style,
                                    borderTop: "2px solid rgba(0, 0, 0, 1)",
                                    borderBottom: "2px solid rgba(0, 0, 0, 1)",
                                    borderLeft: "1px solid rgba(0, 0, 0, 0.5)",
                                    borderRight: "1px solid rgba(0, 0, 0, 0.5)",
                                  };
                                } else {
                                  style = {
                                    ...style,
                                    border: "1px solid rgba(0, 0, 0, 0.5)",
                                  };
                                }

                                return style;
                              }
                            })()}
                            align="center"
                            padding="none"
                          >
                            {!hideAddresses &&
                              data[name][column] &&
                              (() => {
                                let msg = "";
                                if (data[name][column].Address) {
                                  msg += data[name][column].Address;
                                  if (
                                    column in data[name] &&
                                    "Properties" in data[name][column]
                                  ) {
                                    Object.keys(
                                      data[name][column].Properties
                                    ).forEach((key) => {
                                      if (key === "Port") {
                                        msg +=
                                          ":" +
                                          data[name][column].Properties[key]
                                            .Value;
                                      }
                                    });
                                  }
                                }
                                return msg;
                              })()}
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={dataKeysArray.length + 1}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TablePagination
                      className={classes.tableNavigator}
                      rowsPerPageOptions={[1, 5, 10, 25, 100]}
                      component="div"
                      count={teamNames.length}
                      rowsPerPage={rowsPerPage}
                      page={rowPage}
                      onPageChange={handleRowChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <FormControlLabel
                      className={classes.tableNavigator}
                      control={
                        <Switch checked={dense} onChange={toggleChangeDense} />
                      }
                      label="Dense padding"
                    />
                    {policyData &&
                      (token.isAValidToken() ||
                        policyData.showAddresses?.value) && (
                        <FormControlLabel
                          className={classes.tableNavigator}
                          control={
                            <Switch
                              checked={hideAddresses}
                              onChange={toggleHideAddresses}
                            />
                          }
                          label={"Hide Addresses"}
                        />
                      )}
                    {token.isAValidToken() && (
                      <FormControlLabel
                        className={classes.tableNavigator}
                        control={
                          <Switch
                            checked={highlightParentTeam}
                            onChange={toggleHighlightParentTeam}
                          />
                        }
                        label={"Highlight Team Cells"}
                      />
                    )}
                    <TablePagination
                      labelRowsPerPage="Columns per page"
                      rowsPerPageOptions={[1, 5, 10, 25, 100]}
                      component="div"
                      count={dataKeysArray.length}
                      rowsPerPage={columnsPerPage}
                      page={columnPage}
                      className={classes.tableNavigator}
                      onPageChange={handleColumnChangePage}
                      onRowsPerPageChange={handleChangeColumnsPerPage}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <CircularProgress />

          {reportData?.Round === 0 && (
            <div>
              <Typography>Competition have not started yet!</Typography>
              <Typography>
                This window will automatically reload once the first round is
                scored.
              </Typography>
            </div>
          )}
        </div>
      )}
    </>
  );
}
