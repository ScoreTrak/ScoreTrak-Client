/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.user.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_user_v1_user_pb from '../../../scoretrak/user/v1/user_pb';


export class UserServiceClient {
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
    '/scoretrak.user.v1.UserService/GetAll',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.GetAllRequest,
    scoretrak_user_v1_user_pb.GetAllResponse,
    (request: scoretrak_user_v1_user_pb.GetAllRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.GetAllResponse.deserializeBinary
  );

  getAll(
    request: scoretrak_user_v1_user_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.GetAllResponse>;

  getAll(
    request: scoretrak_user_v1_user_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetAllResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.GetAllResponse>;

  getAll(
    request: scoretrak_user_v1_user_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetAllResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/GetAll',
        request,
        metadata || {},
        this.methodDescriptorGetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/GetAll',
    request,
    metadata || {},
    this.methodDescriptorGetAll);
  }

  methodDescriptorGetByID = new grpcWeb.MethodDescriptor(
    '/scoretrak.user.v1.UserService/GetByID',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.GetByIDRequest,
    scoretrak_user_v1_user_pb.GetByIDResponse,
    (request: scoretrak_user_v1_user_pb.GetByIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.GetByIDResponse.deserializeBinary
  );

  getByID(
    request: scoretrak_user_v1_user_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_user_v1_user_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetByIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.GetByIDResponse>;

  getByID(
    request: scoretrak_user_v1_user_pb.GetByIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetByIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/GetByID',
        request,
        metadata || {},
        this.methodDescriptorGetByID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/GetByID',
    request,
    metadata || {},
    this.methodDescriptorGetByID);
  }

  methodDescriptorDelete = new grpcWeb.MethodDescriptor(
    '/scoretrak.user.v1.UserService/Delete',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.DeleteRequest,
    scoretrak_user_v1_user_pb.DeleteResponse,
    (request: scoretrak_user_v1_user_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: scoretrak_user_v1_user_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.DeleteResponse>;

  delete(
    request: scoretrak_user_v1_user_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.DeleteResponse>;

  delete(
    request: scoretrak_user_v1_user_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/Delete',
        request,
        metadata || {},
        this.methodDescriptorDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/Delete',
    request,
    metadata || {},
    this.methodDescriptorDelete);
  }

  methodDescriptorStore = new grpcWeb.MethodDescriptor(
    '/scoretrak.user.v1.UserService/Store',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.StoreRequest,
    scoretrak_user_v1_user_pb.StoreResponse,
    (request: scoretrak_user_v1_user_pb.StoreRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.StoreResponse.deserializeBinary
  );

  store(
    request: scoretrak_user_v1_user_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.StoreResponse>;

  store(
    request: scoretrak_user_v1_user_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.StoreResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.StoreResponse>;

  store(
    request: scoretrak_user_v1_user_pb.StoreRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.StoreResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/Store',
        request,
        metadata || {},
        this.methodDescriptorStore,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/Store',
    request,
    metadata || {},
    this.methodDescriptorStore);
  }

  methodDescriptorUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.user.v1.UserService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.UpdateRequest,
    scoretrak_user_v1_user_pb.UpdateResponse,
    (request: scoretrak_user_v1_user_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_user_v1_user_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.UpdateResponse>;

  update(
    request: scoretrak_user_v1_user_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.UpdateResponse>;

  update(
    request: scoretrak_user_v1_user_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/Update',
        request,
        metadata || {},
        this.methodDescriptorUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/Update',
    request,
    metadata || {},
    this.methodDescriptorUpdate);
  }

  methodDescriptorGetByUsername = new grpcWeb.MethodDescriptor(
    '/scoretrak.user.v1.UserService/GetByUsername',
    grpcWeb.MethodType.UNARY,
    scoretrak_user_v1_user_pb.GetByUsernameRequest,
    scoretrak_user_v1_user_pb.GetByUsernameResponse,
    (request: scoretrak_user_v1_user_pb.GetByUsernameRequest) => {
      return request.serializeBinary();
    },
    scoretrak_user_v1_user_pb.GetByUsernameResponse.deserializeBinary
  );

  getByUsername(
    request: scoretrak_user_v1_user_pb.GetByUsernameRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_user_v1_user_pb.GetByUsernameResponse>;

  getByUsername(
    request: scoretrak_user_v1_user_pb.GetByUsernameRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetByUsernameResponse) => void): grpcWeb.ClientReadableStream<scoretrak_user_v1_user_pb.GetByUsernameResponse>;

  getByUsername(
    request: scoretrak_user_v1_user_pb.GetByUsernameRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_user_v1_user_pb.GetByUsernameResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.user.v1.UserService/GetByUsername',
        request,
        metadata || {},
        this.methodDescriptorGetByUsername,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.user.v1.UserService/GetByUsername',
    request,
    metadata || {},
    this.methodDescriptorGetByUsername);
  }

}

