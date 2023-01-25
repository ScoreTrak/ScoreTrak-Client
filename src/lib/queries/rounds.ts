import { useQuery } from "@tanstack/react-query";
import {
  RoundServiceGetAllRequest,
  RoundServiceGetByIDRequest,
  Round,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/round/v2/round_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";

export function useRoundsQuery() {
  async function fetchRounds() {
    const roundsResponse = await gRPCClients.round.v2.roundServicePromiseClient.getAll(
      new RoundServiceGetAllRequest()
    );
    return roundsResponse.getRoundsList();
  }

  return useQuery<Round[], grpcWeb.RpcError, Round[]>(["rounds"], fetchRounds);
}

export function useRoundQuery(roundId: string) {
  async function fetchRoundById(id: string) {
    const request = new RoundServiceGetByIDRequest().setId(parseInt(id));
    const roundResponse = await gRPCClients.round.v2.roundServicePromiseClient.getAll(request);
    return roundResponse.getRoundsList();
  }

  return useQuery<Round[], grpcWeb.RpcError, Round[]>(["rounds"], () =>
    fetchRoundById(roundId)
  );
}
