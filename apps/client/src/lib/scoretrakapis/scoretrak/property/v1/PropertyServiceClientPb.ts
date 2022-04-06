/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.property.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_property_v1_property_pb from '../../../scoretrak/property/v1/property_pb';


export class PropertyServiceClient {
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
    '/scoretrak.property.v1.PropertyService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.GetAllRequest,
    scoretrak_property_v1_property_pb.GetAllResponse,
    (request: scoretrak_property_v1_property_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_property_v1_property_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.GetAllResponse>;

  getAll(
    request: scoretrak_property_v1_property_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.GetAllResponse>;

  getAll(
    request: scoretrak_property_v1_property_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/GetAll',
        request,
        metadata || {},
        this.methodInfoGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/GetAll',
    request,
    metadata || {},
    this.methodInfoGetAll);
  }

  methodInfoDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.property.v1.PropertyService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.DeleteRequest,
    scoretrak_property_v1_property_pb.DeleteResponse,
    (request: scoretrak_property_v1_property_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_property_v1_property_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.DeleteResponse>;

  delete(
    request: scoretrak_property_v1_property_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.DeleteResponse>;

  delete(
    request: scoretrak_property_v1_property_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

  methodInfoStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.property.v1.PropertyService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.StoreRequest,
    scoretrak_property_v1_property_pb.StoreResponse,
    (request: scoretrak_property_v1_property_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_property_v1_property_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.StoreResponse>;

  store(
    request: scoretrak_property_v1_property_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.StoreResponse>;

  store(
    request: scoretrak_property_v1_property_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/Store',
        request,
        metadata || {},
        this.methodInfoStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/Store',
    request,
    metadata || {},
    this.methodInfoStore);
  }

  methodInfoUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.property.v1.PropertyService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.UpdateRequest,
    scoretrak_property_v1_property_pb.UpdateResponse,
    (request: scoretrak_property_v1_property_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_property_v1_property_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.UpdateResponse>;

  update(
    request: scoretrak_property_v1_property_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.UpdateResponse>;

  update(
    request: scoretrak_property_v1_property_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

  methodInfoGetByServiceIDKey = new grpcWeb.MethodDescriptor(
    '/scoretrak.property.v1.PropertyService/GetByServiceIDKey',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.GetByServiceIDKeyRequest,
    scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse,
    (request: scoretrak_property_v1_property_pb.GetByServiceIDKeyRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse.deserializeBinary
  );

  getByServiceIDKey(
    request: scoretrak_property_v1_property_pb.GetByServiceIDKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse>;

  getByServiceIDKey(
    request: scoretrak_property_v1_property_pb.GetByServiceIDKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse>;

  getByServiceIDKey(
    request: scoretrak_property_v1_property_pb.GetByServiceIDKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetByServiceIDKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/GetByServiceIDKey',
        request,
        metadata || {},
        this.methodInfoGetByServiceIDKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/GetByServiceIDKey',
    request,
    metadata || {},
    this.methodInfoGetByServiceIDKey);
  }

  methodInfoGetAllByServiceID = new grpcWeb.MethodDescriptor(
    '/scoretrak.property.v1.PropertyService/GetAllByServiceID',
    grpcWeb.MethodType.UNARY,
    scoretrak_property_v1_property_pb.GetAllByServiceIDRequest,
    scoretrak_property_v1_property_pb.GetAllByServiceIDResponse,
    (request: scoretrak_property_v1_property_pb.GetAllByServiceIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_property_v1_property_pb.GetAllByServiceIDResponse.deserializeBinary
  );

  getAllByServiceID(
    request: scoretrak_property_v1_property_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_property_v1_property_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: scoretrak_property_v1_property_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetAllByServiceIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_property_v1_property_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: scoretrak_property_v1_property_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_property_v1_property_pb.GetAllByServiceIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.property.v1.PropertyService/GetAllByServiceID',
        request,
        metadata || {},
        this.methodInfoGetAllByServiceID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.property.v1.PropertyService/GetAllByServiceID',
    request,
    metadata || {},
    this.methodInfoGetAllByServiceID);
  }

}

