/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.service_group.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_service_group_v1_service_group_pb from '../../../scoretrak/service_group/v1/service_group_pb';


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

  methodDescriptorGetAll = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.GetAllRequest,
    scoretrak_service_group_v1_service_group_pb.GetAllResponse,
    (request: scoretrak_service_group_v1_service_group_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.GetAllResponse>;

  getAll(
    request: scoretrak_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.GetAllResponse>;

  getAll(
    request: scoretrak_service_group_v1_service_group_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/GetAll',
        request,
        metadata || {},
        this.methodDescriptorGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/GetAll',
    request,
    metadata || {},
    this.methodDescriptorGetAll);
  }

  methodDescriptorGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.GetByIDRequest,
    scoretrak_service_group_v1_service_group_pb.GetByIDResponse,
    (request: scoretrak_service_group_v1_service_group_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_service_group_v1_service_group_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/GetByID',
        request,
        metadata || {},
        this.methodDescriptorGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/GetByID',
    request,
    metadata || {},
    this.methodDescriptorGetByID);
  }

  methodDescriptorDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.DeleteRequest,
    scoretrak_service_group_v1_service_group_pb.DeleteResponse,
    (request: scoretrak_service_group_v1_service_group_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.DeleteResponse>;

  delete(
    request: scoretrak_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.DeleteResponse>;

  delete(
    request: scoretrak_service_group_v1_service_group_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/Delete',
        request,
        metadata || {},
        this.methodDescriptorDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/Delete',
    request,
    metadata || {},
    this.methodDescriptorDelete);
  }

  methodDescriptorStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.StoreRequest,
    scoretrak_service_group_v1_service_group_pb.StoreResponse,
    (request: scoretrak_service_group_v1_service_group_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.StoreResponse>;

  store(
    request: scoretrak_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.StoreResponse>;

  store(
    request: scoretrak_service_group_v1_service_group_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/Store',
        request,
        metadata || {},
        this.methodDescriptorStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/Store',
    request,
    metadata || {},
    this.methodDescriptorStore);
  }

  methodDescriptorUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.UpdateRequest,
    scoretrak_service_group_v1_service_group_pb.UpdateResponse,
    (request: scoretrak_service_group_v1_service_group_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.UpdateResponse>;

  update(
    request: scoretrak_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.UpdateResponse>;

  update(
    request: scoretrak_service_group_v1_service_group_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/Update',
        request,
        metadata || {},
        this.methodDescriptorUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/Update',
    request,
    metadata || {},
    this.methodDescriptorUpdate);
  }

  methodDescriptorRedeploy = new grpcWeb.MethodDescriptor(
    '/scoretrak.service_group.v1.ServiceGroupService/Redeploy',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_group_v1_service_group_pb.RedeployRequest,
    scoretrak_service_group_v1_service_group_pb.RedeployResponse,
    (request: scoretrak_service_group_v1_service_group_pb.RedeployRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_group_v1_service_group_pb.RedeployResponse.deserializeBinary
  );

  redeploy(
    request: scoretrak_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_group_v1_service_group_pb.RedeployResponse>;

  redeploy(
    request: scoretrak_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.RedeployResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_group_v1_service_group_pb.RedeployResponse>;

  redeploy(
    request: scoretrak_service_group_v1_service_group_pb.RedeployRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_group_v1_service_group_pb.RedeployResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service_group.v1.ServiceGroupService/Redeploy',
        request,
        metadata || {},
        this.methodDescriptorRedeploy,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service_group.v1.ServiceGroupService/Redeploy',
    request,
    metadata || {},
    this.methodDescriptorRedeploy);
  }

}

