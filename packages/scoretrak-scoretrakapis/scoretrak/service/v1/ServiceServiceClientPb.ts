/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.service.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_service_v1_service_pb from '../../../scoretrak/service/v1/service_pb';


export class ServiceServiceClient {
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
    '/scoretrak.service.v1.ServiceService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.GetAllRequest,
    scoretrak_service_v1_service_pb.GetAllResponse,
    (request: scoretrak_service_v1_service_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_service_v1_service_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.GetAllResponse>;

  getAll(
    request: scoretrak_service_v1_service_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.GetAllResponse>;

  getAll(
    request: scoretrak_service_v1_service_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/GetAll',
        request,
        metadata || {},
        this.methodDescriptorGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/GetAll',
    request,
    metadata || {},
    this.methodDescriptorGetAll);
  }

  methodDescriptorGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.service.v1.ServiceService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.GetByIDRequest,
    scoretrak_service_v1_service_pb.GetByIDResponse,
    (request: scoretrak_service_v1_service_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_service_v1_service_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_service_v1_service_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_service_v1_service_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/GetByID',
        request,
        metadata || {},
        this.methodDescriptorGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/GetByID',
    request,
    metadata || {},
    this.methodDescriptorGetByID);
  }

  methodDescriptorDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.service.v1.ServiceService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.DeleteRequest,
    scoretrak_service_v1_service_pb.DeleteResponse,
    (request: scoretrak_service_v1_service_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_service_v1_service_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.DeleteResponse>;

  delete(
    request: scoretrak_service_v1_service_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.DeleteResponse>;

  delete(
    request: scoretrak_service_v1_service_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/Delete',
        request,
        metadata || {},
        this.methodDescriptorDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/Delete',
    request,
    metadata || {},
    this.methodDescriptorDelete);
  }

  methodDescriptorStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.service.v1.ServiceService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.StoreRequest,
    scoretrak_service_v1_service_pb.StoreResponse,
    (request: scoretrak_service_v1_service_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_service_v1_service_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.StoreResponse>;

  store(
    request: scoretrak_service_v1_service_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.StoreResponse>;

  store(
    request: scoretrak_service_v1_service_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/Store',
        request,
        metadata || {},
        this.methodDescriptorStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/Store',
    request,
    metadata || {},
    this.methodDescriptorStore);
  }

  methodDescriptorUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.service.v1.ServiceService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.UpdateRequest,
    scoretrak_service_v1_service_pb.UpdateResponse,
    (request: scoretrak_service_v1_service_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_service_v1_service_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.UpdateResponse>;

  update(
    request: scoretrak_service_v1_service_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.UpdateResponse>;

  update(
    request: scoretrak_service_v1_service_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/Update',
        request,
        metadata || {},
        this.methodDescriptorUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/Update',
    request,
    metadata || {},
    this.methodDescriptorUpdate);
  }

  methodDescriptorTestService = new grpcWeb.MethodDescriptor(
    '/scoretrak.service.v1.ServiceService/TestService',
    grpcWeb.MethodType.UNARY,
    scoretrak_service_v1_service_pb.TestServiceRequest,
    scoretrak_service_v1_service_pb.TestServiceResponse,
    (request: scoretrak_service_v1_service_pb.TestServiceRequest) => {
      return request.serializeBinary();
    },
    scoretrak_service_v1_service_pb.TestServiceResponse.deserializeBinary
  );

  testService(
    request: scoretrak_service_v1_service_pb.TestServiceRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_service_v1_service_pb.TestServiceResponse>;

  testService(
    request: scoretrak_service_v1_service_pb.TestServiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.TestServiceResponse) => void): grpcWeb.ClientReadableStream<scoretrak_service_v1_service_pb.TestServiceResponse>;

  testService(
    request: scoretrak_service_v1_service_pb.TestServiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_service_v1_service_pb.TestServiceResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.service.v1.ServiceService/TestService',
        request,
        metadata || {},
        this.methodDescriptorTestService,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.service.v1.ServiceService/TestService',
    request,
    metadata || {},
    this.methodDescriptorTestService);
  }

}

