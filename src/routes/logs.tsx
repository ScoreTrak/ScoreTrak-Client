import {
  GetAllRequest,
  Round,
} from "../lib/scoretrakapis/scoretrak/round/v1/round_pb";
import { useSnackbar } from "notistack";
import MaterialTable, { Column } from "@material-table/core";
import { useEffect, useState } from "react";
import { Severity } from "../types/types";
import { SnackbarDismissButton } from "../components/SnackbarDismissButton";
import Box from "@material-ui/core/Box";
import { CircularProgress, Container } from "@material-ui/core";
import { gRPCClients } from "../grpc/gRPCClients";

type roundColumns = {
  id: number;
  start: Date | undefined;
  finish: Date | undefined;
  note: string;
  err: string;
};

function roundToRoundColumn(round: Round): roundColumns {
  return {
    id: round.getId(),
    start: round.getStart()
      ? new Date((round.getStart()?.getSeconds() as number) * 1000)
      : undefined,
    finish: round.getFinish()
      ? new Date((round.getFinish()?.getSeconds() as number) * 1000)
      : undefined,
    err: round.getErr(),
    note: round.getNote(),
  };
}

export default function Logs() {
  const title = "Rounds";
  const { enqueueSnackbar } = useSnackbar();
  const columns: Array<Column<roundColumns>> = [
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Start Time", field: "start", type: "datetime" },
    { title: "Note", field: "note" },
    { title: "Error", field: "err" },
    { title: "Finish Time", field: "finish", type: "datetime" },
  ];

  const [state, setState] = useState<{
    columns: any[];
    loader: boolean;
    data: roundColumns[];
  }>({
    columns,
    loader: true,
    data: [],
  });

  function reloadSetter() {
    gRPCClients.roundClient.getAll(new GetAllRequest(), {}).then(
      (roundsResponse) => {
        setState((prevState) => {
          return {
            ...prevState,
            data: roundsResponse.getRoundsList().map((round): roundColumns => {
              return roundToRoundColumn(round);
            }),
            loader: false,
          };
        });
      },
      (err: any) => {
        enqueueSnackbar(
          `Encountered an error while retrieving Rounds: ${err.message}. Error code: ${err.code}`,
          { variant: Severity.Error, action: SnackbarDismissButton }
        );
      }
    );
  }
  useEffect(() => {
    reloadSetter();
  }, []);

  return (
    <>
      {!state.loader ? (
        <Container maxWidth={"xl"}>
          <Box height="100%" width="100%" marginTop={3}>
            <MaterialTable
              title={title}
              columns={state.columns}
              data={state.data}
              options={{
                pageSizeOptions: [5, 10, 20, 50, 100, 500, 1000],
                pageSize: 20,
                emptyRowsWhenPaging: false,
              }}
            />
          </Box>
        </Container>
      ) : (
        <Box height="100%" width="100%" m="auto">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
