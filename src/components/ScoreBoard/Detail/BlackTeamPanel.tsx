import { CustomRow, Row } from "~/components/ScoreBoard/Detail/CustomRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useReportQuery } from "~/lib/queries/reports";


export default function BlackTeamPanel() {
  const {data: reportData, isLoading: reportIsLoading} = useReportQuery()

  const data: Row[] = [];
  if (reportData) {
    Object.keys(reportData.Teams).forEach((team_id) => {
      data.push({
        team_id,
        team_name: reportData.Teams[team_id].Name,
      });
    });
    data.sort((a, b) => (a.team_name > b.team_name ? 1 : -1));
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Team Name</TableCell>
            <TableCell align="right">Team ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <CustomRow key={row.team_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}