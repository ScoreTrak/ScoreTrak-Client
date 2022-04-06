/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.round.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_round_v1_round_pb from '../../../scoretrak/round/v1/round_pb';


export class RoundServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetLastNonElapsingRound = new grpcWeb.MethodDescriptor(
    '/scoretrak.round.v1.RoundService/GetLastNonElapsingRound',
    grpcWeb.MethodType.UNARY,
    scoretrak_round_v1_round_pb.GetLastNonElapsingRoundRequest,
    scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse,
    (request: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundRequest) => {
      return request.serializeBinary();
    },
    scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse.deserializeBinary
  );

  getLastNonElapsingRound(
    request: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse>;

  getLastNonElapsingRound(
    request: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse) => void): grpcWeb.ClientReadableStream<scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse>;

  getLastNonElapsingRound(
    request: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetLastNonElapsingRoundResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.round.v1.RoundService/GetLastNonElapsingRound',
        request,
        metadata || {},
        this.methodDescriptorGetLastNonElapsingRound,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.round.v1.RoundService/GetLastNonElapsingRound',
    request,
    metadata || {},
    this.methodDescriptorGetLastNonElapsingRound);
  }

  methodDescriptorGetAll = new grpcWeb.MethodDescriptor(
    '/scoretrak.round.v1.RoundService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_round_v1_round_pb.GetAllRequest,
    scoretrak_round_v1_round_pb.GetAllResponse,
    (request: scoretrak_round_v1_round_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_round_v1_round_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_round_v1_round_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_round_v1_round_pb.GetAllResponse>;

  getAll(
    request: scoretrak_round_v1_round_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_round_v1_round_pb.GetAllResponse>;

  getAll(
    request: scoretrak_round_v1_round_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.round.v1.RoundService/GetAll',
        request,
        metadata || {},
        this.methodDescriptorGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.round.v1.RoundService/GetAll',
    request,
    metadata || {},
    this.methodDescriptorGetAll);
  }

  methodDescriptorGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.round.v1.RoundService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_round_v1_round_pb.GetByIDRequest,
    scoretrak_round_v1_round_pb.GetByIDResponse,
    (request: scoretrak_round_v1_round_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_round_v1_round_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_round_v1_round_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_round_v1_round_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_round_v1_round_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_round_v1_round_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_round_v1_round_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.round.v1.RoundService/GetByID',
        request,
        metadata || {},
        this.methodDescriptorGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.round.v1.RoundService/GetByID',
    request,
    metadata || {},
    this.methodDescriptorGetByID);
  }

  methodDescriptorGetLastRound = new grpcWeb.MethodDescriptor(
    '/scoretrak.round.v1.RoundService/GetLastRound',
    grpcWeb.MethodType.UNARY,
    scoretrak_round_v1_round_pb.GetLastRoundRequest,
    scoretrak_round_v1_round_pb.GetLastRoundResponse,
    (request: scoretrak_round_v1_round_pb.GetLastRoundRequest) => {
      return request.serializeBinary();
    },
    scoretrak_round_v1_round_pb.GetLastRoundResponse.deserializeBinary
  );

  getLastRound(
    request: scoretrak_round_v1_round_pb.GetLastRoundRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_round_v1_round_pb.GetLastRoundResponse>;

  getLastRound(
    request: scoretrak_round_v1_round_pb.GetLastRoundRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetLastRoundResponse) => void): grpcWeb.ClientReadableStream<scoretrak_round_v1_round_pb.GetLastRoundResponse>;

  getLastRound(
    request: scoretrak_round_v1_round_pb.GetLastRoundRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_round_v1_round_pb.GetLastRoundResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.round.v1.RoundService/GetLastRound',
        request,
        metadata || {},
        this.methodDescriptorGetLastRound,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.round.v1.RoundService/GetLastRound',
    request,
    metadata || {},
    this.methodDescriptorGetLastRound);
  }

}

