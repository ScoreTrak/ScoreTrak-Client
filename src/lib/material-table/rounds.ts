import {Round} from "../scoretrakapis/scoretrak/round/v1/round_pb";
import {IRound} from "../../types/material_table";

function roundToIRound(round: Round): IRound {
    return {
        id: round.getId(),
        start: round.getStart() ? new Date(round.getStart()?.getSeconds() as number * 1000) : undefined,
        finish: round.getFinish() ? new Date(round.getFinish()?.getSeconds() as number * 1000) : undefined,
        err: round.getErr(),
        note: round.getNote(),
    }
}