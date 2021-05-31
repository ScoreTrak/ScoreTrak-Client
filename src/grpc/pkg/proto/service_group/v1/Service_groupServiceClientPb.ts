/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.service_group.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_service_group_v1_service_group_pb from '../../../../pkg/proto/service_group/v1/service_group_pb';


export class ServiceGroupServiceClient {
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
    pkg_proto_service_group_v1_service_group_pb.GetAllResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: pkg_proto_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.GetAllResponse>;

  getAll(
    request: pkg_proto_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.GetAllResponse>;

  getAll(
    request: pkg_proto_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoGetByID = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_service_group_v1_service_group_pb.GetByIDResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: pkg_proto_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.GetByIDResponse>;

  getByID(
    request: pkg_proto_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.GetByIDResponse>;

  getByID(
    request: pkg_proto_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/GetByID',
        request,
        metadata || {},
        this.methodInfoGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/GetByID',
    request,
    metadata || {},
    this.methodInfoGetByID);
  }

  methodInfoDelete = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_service_group_v1_service_group_pb.DeleteResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: pkg_proto_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.DeleteResponse>;

  delete(
    request: pkg_proto_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.DeleteResponse>;

  delete(
    request: pkg_proto_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

  methodInfoStore = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_service_group_v1_service_group_pb.StoreResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.StoreResponse.deserializeBinary
  );

  store(
    request: pkg_proto_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.StoreResponse>;

  store(
    request: pkg_proto_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.StoreResponse>;

  store(
    request: pkg_proto_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/Store',
        request,
        metadata || {},
        this.methodInfoStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/Store',
    request,
    metadata || {},
    this.methodInfoStore);
  }

  methodInfoUpdate = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_service_group_v1_service_group_pb.UpdateResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: pkg_proto_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.UpdateResponse>;

  update(
    request: pkg_proto_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.UpdateResponse>;

  update(
    request: pkg_proto_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

  methodInfoRedeploy = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_service_group_v1_service_group_pb.RedeployResponse,
    (request: pkg_proto_service_group_v1_service_group_pb.RedeployRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_service_group_v1_service_group_pb.RedeployResponse.deserializeBinary
  );

  redeploy(
    request: pkg_proto_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_service_group_v1_service_group_pb.RedeployResponse>;

  redeploy(
    request: pkg_proto_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.RedeployResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_service_group_v1_service_group_pb.RedeployResponse>;

  redeploy(
    request: pkg_proto_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_service_group_v1_service_group_pb.RedeployResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.service_group.v1.ServiceGroupService/Redeploy',
        request,
        metadata || {},
        this.methodInfoRedeploy,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.service_group.v1.ServiceGroupService/Redeploy',
    request,
    metadata || {},
    this.methodInfoRedeploy);
  }

}

