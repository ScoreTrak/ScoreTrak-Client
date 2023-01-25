import MaterialTable, { Column } from "@material-table/core";
import Box from "@material-ui/core/Box";
import { CircularProgress, Container } from "@material-ui/core";
import { useRoundsQuery } from "~/lib/queries/rounds";
import { IRound } from "~/types/material_table";
import { roundToIRound } from "~/lib/material-table/rounds";

export default function Logs() {
  const title = "Rounds";
  const columns: Array<Column<IRound>> = [
    { title: "ID (optional)", field: "id", editable: "onAdd" },
    { title: "Start Time", field: "start", type: "datetime" },
    { title: "Note", field: "note" },
    { title: "Error", field: "err" },
    { title: "Finish Time", field: "finish", type: "datetime" },
  ];

  const { data: roundData, isLoading: roundIsLoading } = useRoundsQuery()

  return (
    <>
      {roundData && !roundIsLoading ? (
        <Container maxWidth={"xl"}>
          <Box height="100%" width="100%" marginTop={3}>
            <MaterialTable
              title={title}
              columns={columns}
              data={roundData.map(roundToIRound)}
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
