/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.check.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_check_v1_check_pb from '../../../../pkg/proto/check/v1/check_pb';


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

  methodInfoGetAllByRoundID = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse,
    (request: pkg_proto_check_v1_check_pb.GetAllByRoundIDRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse.deserializeBinary
  );

  getAllByRoundID(
    request: pkg_proto_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse>;

  getAllByRoundID(
    request: pkg_proto_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse>;

  getAllByRoundID(
    request: pkg_proto_check_v1_check_pb.GetAllByRoundIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetAllByRoundIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.check.v1.CheckService/GetAllByRoundID',
        request,
        metadata || {},
        this.methodInfoGetAllByRoundID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.check.v1.CheckService/GetAllByRoundID',
    request,
    metadata || {},
    this.methodInfoGetAllByRoundID);
  }

  methodInfoGetByRoundServiceID = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse,
    (request: pkg_proto_check_v1_check_pb.GetByRoundServiceIDRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse.deserializeBinary
  );

  getByRoundServiceID(
    request: pkg_proto_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse>;

  getByRoundServiceID(
    request: pkg_proto_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse>;

  getByRoundServiceID(
    request: pkg_proto_check_v1_check_pb.GetByRoundServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetByRoundServiceIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.check.v1.CheckService/GetByRoundServiceID',
        request,
        metadata || {},
        this.methodInfoGetByRoundServiceID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.check.v1.CheckService/GetByRoundServiceID',
    request,
    metadata || {},
    this.methodInfoGetByRoundServiceID);
  }

  methodInfoGetAllByServiceID = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse,
    (request: pkg_proto_check_v1_check_pb.GetAllByServiceIDRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse.deserializeBinary
  );

  getAllByServiceID(
    request: pkg_proto_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: pkg_proto_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse>;

  getAllByServiceID(
    request: pkg_proto_check_v1_check_pb.GetAllByServiceIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_check_v1_check_pb.GetAllByServiceIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.check.v1.CheckService/GetAllByServiceID',
        request,
        metadata || {},
        this.methodInfoGetAllByServiceID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.check.v1.CheckService/GetAllByServiceID',
    request,
    metadata || {},
    this.methodInfoGetAllByServiceID);
  }

}

