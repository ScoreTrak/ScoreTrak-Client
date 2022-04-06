/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.team.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_team_v1_team_pb from '../../../scoretrak/team/v1/team_pb';


export class TeamServiceClient {
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

  methodInfoGetAll = new grpcWeb.MethodDescriptor(
    '/scoretrak.team.v1.TeamService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_team_v1_team_pb.GetAllRequest,
    scoretrak_team_v1_team_pb.GetAllResponse,
    (request: scoretrak_team_v1_team_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_team_v1_team_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_team_v1_team_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_team_v1_team_pb.GetAllResponse>;

  getAll(
    request: scoretrak_team_v1_team_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_team_v1_team_pb.GetAllResponse>;

  getAll(
    request: scoretrak_team_v1_team_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.team.v1.TeamService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.team.v1.TeamService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.team.v1.TeamService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_team_v1_team_pb.GetByIDRequest,
    scoretrak_team_v1_team_pb.GetByIDResponse,
    (request: scoretrak_team_v1_team_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_team_v1_team_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_team_v1_team_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_team_v1_team_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_team_v1_team_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_team_v1_team_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_team_v1_team_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.team.v1.TeamService/GetByID',
        request,
        metadata || {},
        this.methodInfoGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.team.v1.TeamService/GetByID',
    request,
    metadata || {},
    this.methodInfoGetByID);
  }

  methodInfoDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.team.v1.TeamService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_team_v1_team_pb.DeleteRequest,
    scoretrak_team_v1_team_pb.DeleteResponse,
    (request: scoretrak_team_v1_team_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_team_v1_team_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_team_v1_team_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_team_v1_team_pb.DeleteResponse>;

  delete(
    request: scoretrak_team_v1_team_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_team_v1_team_pb.DeleteResponse>;

  delete(
    request: scoretrak_team_v1_team_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.team.v1.TeamService/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.team.v1.TeamService/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

  methodInfoStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.team.v1.TeamService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_team_v1_team_pb.StoreRequest,
    scoretrak_team_v1_team_pb.StoreResponse,
    (request: scoretrak_team_v1_team_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_team_v1_team_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_team_v1_team_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_team_v1_team_pb.StoreResponse>;

  store(
    request: scoretrak_team_v1_team_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_team_v1_team_pb.StoreResponse>;

  store(
    request: scoretrak_team_v1_team_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.team.v1.TeamService/Store',
        request,
        metadata || {},
        this.methodInfoStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.team.v1.TeamService/Store',
    request,
    metadata || {},
    this.methodInfoStore);
  }

  methodInfoUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.team.v1.TeamService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_team_v1_team_pb.UpdateRequest,
    scoretrak_team_v1_team_pb.UpdateResponse,
    (request: scoretrak_team_v1_team_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_team_v1_team_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_team_v1_team_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_team_v1_team_pb.UpdateResponse>;

  update(
    request: scoretrak_team_v1_team_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_team_v1_team_pb.UpdateResponse>;

  update(
    request: scoretrak_team_v1_team_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_team_v1_team_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.team.v1.TeamService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.team.v1.TeamService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

}

