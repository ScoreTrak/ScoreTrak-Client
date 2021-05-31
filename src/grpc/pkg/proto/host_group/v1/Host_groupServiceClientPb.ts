/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.host_group.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_host_group_v1_host_group_pb from '../../../../pkg/proto/host_group/v1/host_group_pb';


export class HostGroupServiceClient {
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

  methodInfoGetAll = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_host_group_v1_host_group_pb.GetAllResponse,
    (request: pkg_proto_host_group_v1_host_group_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_host_group_v1_host_group_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: pkg_proto_host_group_v1_host_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_host_group_v1_host_group_pb.GetAllResponse>;

  getAll(
    request: pkg_proto_host_group_v1_host_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_host_group_v1_host_group_pb.GetAllResponse>;

  getAll(
    request: pkg_proto_host_group_v1_host_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.host_group.v1.HostGroupService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.host_group.v1.HostGroupService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoGetByID = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_host_group_v1_host_group_pb.GetByIDResponse,
    (request: pkg_proto_host_group_v1_host_group_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_host_group_v1_host_group_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: pkg_proto_host_group_v1_host_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_host_group_v1_host_group_pb.GetByIDResponse>;

  getByID(
    request: pkg_proto_host_group_v1_host_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_host_group_v1_host_group_pb.GetByIDResponse>;

  getByID(
    request: pkg_proto_host_group_v1_host_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.host_group.v1.HostGroupService/GetByID',
        request,
        metadata || {},
        this.methodInfoGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.host_group.v1.HostGroupService/GetByID',
    request,
    metadata || {},
    this.methodInfoGetByID);
  }

  methodInfoDelete = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_host_group_v1_host_group_pb.DeleteResponse,
    (request: pkg_proto_host_group_v1_host_group_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_host_group_v1_host_group_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: pkg_proto_host_group_v1_host_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_host_group_v1_host_group_pb.DeleteResponse>;

  delete(
    request: pkg_proto_host_group_v1_host_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_host_group_v1_host_group_pb.DeleteResponse>;

  delete(
    request: pkg_proto_host_group_v1_host_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.host_group.v1.HostGroupService/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.host_group.v1.HostGroupService/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

  methodInfoStore = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_host_group_v1_host_group_pb.StoreResponse,
    (request: pkg_proto_host_group_v1_host_group_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_host_group_v1_host_group_pb.StoreResponse.deserializeBinary
  );

  store(
    request: pkg_proto_host_group_v1_host_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_host_group_v1_host_group_pb.StoreResponse>;

  store(
    request: pkg_proto_host_group_v1_host_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_host_group_v1_host_group_pb.StoreResponse>;

  store(
    request: pkg_proto_host_group_v1_host_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.host_group.v1.HostGroupService/Store',
        request,
        metadata || {},
        this.methodInfoStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.host_group.v1.HostGroupService/Store',
    request,
    metadata || {},
    this.methodInfoStore);
  }

  methodInfoUpdate = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_host_group_v1_host_group_pb.UpdateResponse,
    (request: pkg_proto_host_group_v1_host_group_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_host_group_v1_host_group_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: pkg_proto_host_group_v1_host_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_host_group_v1_host_group_pb.UpdateResponse>;

  update(
    request: pkg_proto_host_group_v1_host_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_host_group_v1_host_group_pb.UpdateResponse>;

  update(
    request: pkg_proto_host_group_v1_host_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_host_group_v1_host_group_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.host_group.v1.HostGroupService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.host_group.v1.HostGroupService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

}

