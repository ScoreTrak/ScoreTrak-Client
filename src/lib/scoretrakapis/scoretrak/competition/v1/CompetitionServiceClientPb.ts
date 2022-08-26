/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.competition.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

import * as grpcWeb from "grpc-web";

import * as scoretrak_competition_v1_competition_pb from "../../../scoretrak/competition/v1/competition_pb";

export class CompetitionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string };
  options_: null | { [index: string]: any };

  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options["format"] = "text";

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorLoadCompetition = new grpcWeb.MethodDescriptor(
    "/scoretrak.competition.v1.CompetitionService/LoadCompetition",
    grpcWeb.MethodType.UNARY,
    scoretrak_competition_v1_competition_pb.LoadCompetitionRequest,
    scoretrak_competition_v1_competition_pb.LoadCompetitionResponse,
    (
      request: scoretrak_competition_v1_competition_pb.LoadCompetitionRequest
    ) => {
      return request.serializeBinary();
    },
    scoretrak_competition_v1_competition_pb.LoadCompetitionResponse.deserializeBinary
  );

  loadCompetition(
    request: scoretrak_competition_v1_competition_pb.LoadCompetitionRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_competition_v1_competition_pb.LoadCompetitionResponse>;

  loadCompetition(
    request: scoretrak_competition_v1_competition_pb.LoadCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.LoadCompetitionResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_competition_v1_competition_pb.LoadCompetitionResponse>;

  loadCompetition(
    request: scoretrak_competition_v1_competition_pb.LoadCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.LoadCompetitionResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          "/scoretrak.competition.v1.CompetitionService/LoadCompetition",
        request,
        metadata || {},
        this.methodDescriptorLoadCompetition,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ +
        "/scoretrak.competition.v1.CompetitionService/LoadCompetition",
      request,
      metadata || {},
      this.methodDescriptorLoadCompetition
    );
  }

  methodDescriptorFetchCoreCompetition = new grpcWeb.MethodDescriptor(
    "/scoretrak.competition.v1.CompetitionService/FetchCoreCompetition",
    grpcWeb.MethodType.UNARY,
    scoretrak_competition_v1_competition_pb.FetchCoreCompetitionRequest,
    scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse,
    (
      request: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionRequest
    ) => {
      return request.serializeBinary();
    },
    scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse.deserializeBinary
  );

  fetchCoreCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse>;

  fetchCoreCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse>;

  fetchCoreCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.FetchCoreCompetitionResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          "/scoretrak.competition.v1.CompetitionService/FetchCoreCompetition",
        request,
        metadata || {},
        this.methodDescriptorFetchCoreCompetition,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ +
        "/scoretrak.competition.v1.CompetitionService/FetchCoreCompetition",
      request,
      metadata || {},
      this.methodDescriptorFetchCoreCompetition
    );
  }

  methodDescriptorFetchEntireCompetition = new grpcWeb.MethodDescriptor(
    "/scoretrak.competition.v1.CompetitionService/FetchEntireCompetition",
    grpcWeb.MethodType.UNARY,
    scoretrak_competition_v1_competition_pb.FetchEntireCompetitionRequest,
    scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse,
    (
      request: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionRequest
    ) => {
      return request.serializeBinary();
    },
    scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse.deserializeBinary
  );

  fetchEntireCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse>;

  fetchEntireCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse>;

  fetchEntireCompetition(
    request: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.FetchEntireCompetitionResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          "/scoretrak.competition.v1.CompetitionService/FetchEntireCompetition",
        request,
        metadata || {},
        this.methodDescriptorFetchEntireCompetition,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ +
        "/scoretrak.competition.v1.CompetitionService/FetchEntireCompetition",
      request,
      metadata || {},
      this.methodDescriptorFetchEntireCompetition
    );
  }

  methodDescriptorResetScores = new grpcWeb.MethodDescriptor(
    "/scoretrak.competition.v1.CompetitionService/ResetScores",
    grpcWeb.MethodType.UNARY,
    scoretrak_competition_v1_competition_pb.ResetScoresRequest,
    scoretrak_competition_v1_competition_pb.ResetScoresResponse,
    (request: scoretrak_competition_v1_competition_pb.ResetScoresRequest) => {
      return request.serializeBinary();
    },
    scoretrak_competition_v1_competition_pb.ResetScoresResponse.deserializeBinary
  );

  resetScores(
    request: scoretrak_competition_v1_competition_pb.ResetScoresRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_competition_v1_competition_pb.ResetScoresResponse>;

  resetScores(
    request: scoretrak_competition_v1_competition_pb.ResetScoresRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.ResetScoresResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_competition_v1_competition_pb.ResetScoresResponse>;

  resetScores(
    request: scoretrak_competition_v1_competition_pb.ResetScoresRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.ResetScoresResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          "/scoretrak.competition.v1.CompetitionService/ResetScores",
        request,
        metadata || {},
        this.methodDescriptorResetScores,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ +
        "/scoretrak.competition.v1.CompetitionService/ResetScores",
      request,
      metadata || {},
      this.methodDescriptorResetScores
    );
  }

  methodDescriptorDeleteCompetition = new grpcWeb.MethodDescriptor(
    "/scoretrak.competition.v1.CompetitionService/DeleteCompetition",
    grpcWeb.MethodType.UNARY,
    scoretrak_competition_v1_competition_pb.DeleteCompetitionRequest,
    scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse,
    (
      request: scoretrak_competition_v1_competition_pb.DeleteCompetitionRequest
    ) => {
      return request.serializeBinary();
    },
    scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse.deserializeBinary
  );

  deleteCompetition(
    request: scoretrak_competition_v1_competition_pb.DeleteCompetitionRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse>;

  deleteCompetition(
    request: scoretrak_competition_v1_competition_pb.DeleteCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse>;

  deleteCompetition(
    request: scoretrak_competition_v1_competition_pb.DeleteCompetitionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_competition_v1_competition_pb.DeleteCompetitionResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          "/scoretrak.competition.v1.CompetitionService/DeleteCompetition",
        request,
        metadata || {},
        this.methodDescriptorDeleteCompetition,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ +
        "/scoretrak.competition.v1.CompetitionService/DeleteCompetition",
      request,
      metadata || {},
      this.methodDescriptorDeleteCompetition
    );
  }
}
