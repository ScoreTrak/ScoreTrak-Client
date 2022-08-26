import { useTitle } from "react-use";
import { useReport } from "../../contexts/ReportContext";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Role, token } from "../../grpc/token/token";
import SingleTeamDetails from "../../components/ScoreBoard/SingleTeamDetails";
import { CustomRow, Row } from "../../components/ScoreBoard/CustomRow";

export default function Details() {
  useTitle("Details");
  const report = useReport();
  function BlackTeamPanel() {
    const data: Row[] = [];
    if (report) {
      Object.keys(report.Teams).forEach((team_id) => {
        data.push({
          team_id,
          team_name: report.Teams[team_id].Name,
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
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {token.getCurrentRole() === Role.Blue ||
      token.getCurrentRole() === Role.Red ? (
        <SingleTeamDetails teamID={token.getCurrentTeamID() as string} />
      ) : (
        BlackTeamPanel()
      )}
    </div>
  );
}
