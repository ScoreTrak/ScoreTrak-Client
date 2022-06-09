/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.check.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_check_v1_check_pb from '../../../scoretrak/check/v1/check_pb';


export class CheckServiceClient {
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

  methodDescriptorGetAllByRoundID = new grpcWeb.MethodDescriptor(
    '/scoretrak.check.v1.CheckService/GetAllByRoundID',
    grpcWeb.MethodType.UNARY,
    scoretrak_check_v1_check_pb.GetAllByRoundIDRequest,
    scoretrak_check_v1_check_pb.GetAllByRoundIDResponse,
    (request: scoretrak_check_v1_check_pb.GetAllByRoundIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_check_v1_check_pb.GetAllByRoundIDResponse.deserializeBinary
  );

  getAllByRoundID(
    request: scoretrak_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_check_v1_check_pb.GetAllByRoundIDResponse>;

  getAllByRoundID(
    request: scoretrak_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetAllByRoundIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_check_v1_check_pb.GetAllByRoundIDResponse>;

  getAllByRoundID(
    request: scoretrak_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetAllByRoundIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.check.v1.CheckService/GetAllByRoundID',
        request,
        metadata || {},
        this.methodDescriptorGetAllByRoundID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.check.v1.CheckService/GetAllByRoundID',
    request,
    metadata || {},
    this.methodDescriptorGetAllByRoundID);
  }

  methodDescriptorGetByRoundServiceID = new grpcWeb.MethodDescriptor(
    '/scoretrak.check.v1.CheckService/GetByRoundServiceID',
    grpcWeb.MethodType.UNARY,
    scoretrak_check_v1_check_pb.GetByRoundServiceIDRequest,
    scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse,
    (request: scoretrak_check_v1_check_pb.GetByRoundServiceIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse.deserializeBinary
  );

  getByRoundServiceID(
    request: scoretrak_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse>;

  getByRoundServiceID(
    request: scoretrak_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse>;

  getByRoundServiceID(
    request: scoretrak_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetByRoundServiceIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.check.v1.CheckService/GetByRoundServiceID',
        request,
        metadata || {},
        this.methodDescriptorGetByRoundServiceID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.check.v1.CheckService/GetByRoundServiceID',
    request,
    metadata || {},
    this.methodDescriptorGetByRoundServiceID);
  }

  methodDescriptorGetAllByServiceID = new grpcWeb.MethodDescriptor(
    '/scoretrak.check.v1.CheckService/GetAllByServiceID',
    grpcWeb.MethodType.UNARY,
    scoretrak_check_v1_check_pb.GetAllByServiceIDRequest,
    scoretrak_check_v1_check_pb.GetAllByServiceIDResponse,
    (request: scoretrak_check_v1_check_pb.GetAllByServiceIDRequest) => {
      return request.serializeBinary();
    },
    scoretrak_check_v1_check_pb.GetAllByServiceIDResponse.deserializeBinary
  );

  getAllByServiceID(
    request: scoretrak_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_check_v1_check_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: scoretrak_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetAllByServiceIDResponse) => void): grpcWeb.ClientReadableStream<scoretrak_check_v1_check_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: scoretrak_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_check_v1_check_pb.GetAllByServiceIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.check.v1.CheckService/GetAllByServiceID',
        request,
        metadata || {},
        this.methodDescriptorGetAllByServiceID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.check.v1.CheckService/GetAllByServiceID',
    request,
    metadata || {},
    this.methodDescriptorGetAllByServiceID);
  }

}

