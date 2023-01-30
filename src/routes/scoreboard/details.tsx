import { useTitle } from "react-use";
import { Role, token } from "../../lib/token/token";
import SingleTeamDetails from "../../components/ScoreBoard/Detail/SingleTeamDetails";
import BlackTeamPanel from "~/components/ScoreBoard/Detail/BlackTeamPanel";

export default function Details() {
  useTitle("Details");

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {
        token.getCurrentRole() === Role.Blue ||
        token.getCurrentRole() === Role.Red ?
          (
            <SingleTeamDetails teamID={token.getCurrentTeamID() as string} />
          )
          :
          (
            BlackTeamPanel()
          )
      }
    </div>
  );
}
