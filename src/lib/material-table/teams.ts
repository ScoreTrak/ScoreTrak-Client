import { Team } from "../scoretrakapis/scoretrak/team/v1/team_pb";
import {
  BoolValue,
  UInt64Value,
} from "google-protobuf/google/protobuf/wrappers_pb";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";
import { ITeam } from "../../types/material_table";

export function teamToITeam(team: Team): ITeam {
  return {
    pause: team.getPause()?.getValue(),
    id: team.getId()?.getValue(),
    name: team.getName(),
    index: team.getIndex()?.getValue(),
    hide: team.getHide()?.getValue(),
  };
}

export function ITeamToTeam(team: ITeam): Team {
  const t = new Team();
  if (team.pause != null) t.setPause(new BoolValue().setValue(team.pause));
  if (team.hide != null) t.setHide(new BoolValue().setValue(team.hide));
  if (team.id && team.id !== "") t.setId(new UUID().setValue(team.id));
  t.setName(team.name);
  if (team.index != null && !isNaN(team.index))
    t.setIndex(new UInt64Value().setValue(team.index));
  return t;
}
