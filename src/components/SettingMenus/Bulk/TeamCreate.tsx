import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  StoreRequest,
  Team,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/team/v1/team_pb";
import { Severity } from "../../../types/types";
import { UInt64Value } from "google-protobuf/google/protobuf/wrappers_pb";
import { useSnackbar } from "notistack";
import { SnackbarDismissButton } from "../../SnackbarDismissButton";
import { gRPCClients } from "../../../lib/grpc/gRPCClients";

function numberRange(start: number, end: number) {
  if (start > end) {
    const tmp = start;
    start = end;
    end = tmp;
  }
  end = end + 1;
  return new Array(end - start).fill(undefined).map((d, i) => i + start);
}

function parse_index(rng: string) {
  const stripped = rng.replace(/\s+/g, "");
  const ranges = stripped.split(",");
  const ret: number[] = [];

  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i].split("-").length === 1) {
      const num = parseInt(ranges[i]);
      if (!isNaN(num)) {
        ret.push(num);
      } else {
        return [];
      }
    } else if (ranges[i].split("-").length === 2) {
      const start = parseInt(ranges[i].split("-")[0]);
      const end = parseInt(ranges[i].split("-")[1]);
      if (!isNaN(start) && !isNaN(end)) {
        ret.push(...numberRange(start, end));
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  return Array.from(new Set(ret).values()).sort(function (a, b) {
    return a - b;
  });
}

const TeamCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<{ name: JSX.Element; index: number }[]>([]);

  const columns = [
    { id: "name", label: "Team Name" },
    {
      id: "index",
      label: "Index",
      field: (
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRows(
              parse_index(event.target.value).map((idx: number) => {
                return {
                  name: (
                    <TextField required label="Team Name" id={`name_${idx}`} />
                  ),
                  index: idx,
                };
              })
            );
          }}
          id="filled-helperText"
          label="Index"
          helperText="This field is used to create host addresses. Ex: 1,2,4-15"
        />
      ),
    },
  ];

  function submit() {
    const teams = rows.map((row) => {
      return {
        index: row.index,
        name: (document.getElementById(`name_${row.index}`) as HTMLInputElement)
          .value,
      };
    });
    const storeRequest = new StoreRequest();
    teams.forEach((team) => {
      storeRequest.addTeams(
        new Team()
          .setIndex(new UInt64Value().setValue(team.index))
          .setName(team.name),
        0
      );
    });
    gRPCClients.team.v1.teamServicePromiseClient.store(storeRequest).then(
      (_) => {
        enqueueSnackbar(`Teams Created!`, { variant: Severity.Success });
      },
      (err: any) => {
        enqueueSnackbar(
          `Unable to store teams: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }

  return (
    <>
      <div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell style={{ minWidth: "300px" }} key={column.id}>
                  {column.field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    let value;
                    if (column.id === "name") {
                      value = row.name;
                    }
                    if (column.id === "index") {
                      value = row.index;
                    }
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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

export default TeamCreate;
