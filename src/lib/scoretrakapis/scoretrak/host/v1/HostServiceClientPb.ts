/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.host.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_host_v1_host_pb from '../../../scoretrak/host/v1/host_pb';


export class HostServiceClient {
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
    '/scoretrak.host.v1.HostService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_host_v1_host_pb.GetAllRequest,
    scoretrak_host_v1_host_pb.GetAllResponse,
    (request: scoretrak_host_v1_host_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_host_v1_host_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_host_v1_host_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_host_v1_host_pb.GetAllResponse>;

  getAll(
    request: scoretrak_host_v1_host_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_host_v1_host_pb.GetAllResponse>;

  getAll(
    request: scoretrak_host_v1_host_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.host.v1.HostService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.host.v1.HostService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.host.v1.HostService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_host_v1_host_pb.GetByIDRequest,
    scoretrak_host_v1_host_pb.GetByIDResponse,
    (request: scoretrak_host_v1_host_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_host_v1_host_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_host_v1_host_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_host_v1_host_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_host_v1_host_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_host_v1_host_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_host_v1_host_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.host.v1.HostService/GetByID',
        request,
        metadata || {},
        this.methodInfoGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.host.v1.HostService/GetByID',
    request,
    metadata || {},
    this.methodInfoGetByID);
  }

  methodInfoDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.host.v1.HostService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_host_v1_host_pb.DeleteRequest,
    scoretrak_host_v1_host_pb.DeleteResponse,
    (request: scoretrak_host_v1_host_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_host_v1_host_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_host_v1_host_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_host_v1_host_pb.DeleteResponse>;

  delete(
    request: scoretrak_host_v1_host_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_host_v1_host_pb.DeleteResponse>;

  delete(
    request: scoretrak_host_v1_host_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.host.v1.HostService/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.host.v1.HostService/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

  methodInfoStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.host.v1.HostService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_host_v1_host_pb.StoreRequest,
    scoretrak_host_v1_host_pb.StoreResponse,
    (request: scoretrak_host_v1_host_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_host_v1_host_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_host_v1_host_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_host_v1_host_pb.StoreResponse>;

  store(
    request: scoretrak_host_v1_host_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_host_v1_host_pb.StoreResponse>;

  store(
    request: scoretrak_host_v1_host_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.host.v1.HostService/Store',
        request,
        metadata || {},
        this.methodInfoStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.host.v1.HostService/Store',
    request,
    metadata || {},
    this.methodInfoStore);
  }

  methodInfoUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.host.v1.HostService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_host_v1_host_pb.UpdateRequest,
    scoretrak_host_v1_host_pb.UpdateResponse,
    (request: scoretrak_host_v1_host_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_host_v1_host_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_host_v1_host_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_host_v1_host_pb.UpdateResponse>;

  update(
    request: scoretrak_host_v1_host_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_host_v1_host_pb.UpdateResponse>;

  update(
    request: scoretrak_host_v1_host_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_host_v1_host_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.host.v1.HostService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.host.v1.HostService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

}

