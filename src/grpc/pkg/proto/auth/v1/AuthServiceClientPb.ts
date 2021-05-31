/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.auth.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_auth_v1_auth_pb from '../../../../pkg/proto/auth/v1/auth_pb';


export class AuthServiceClient {
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

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_auth_v1_auth_pb.LoginResponse,
    (request: pkg_proto_auth_v1_auth_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_auth_v1_auth_pb.LoginResponse.deserializeBinary
  );

  login(
    request: pkg_proto_auth_v1_auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_auth_v1_auth_pb.LoginResponse>;

  login(
    request: pkg_proto_auth_v1_auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_auth_v1_auth_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_auth_v1_auth_pb.LoginResponse>;

  login(
    request: pkg_proto_auth_v1_auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_auth_v1_auth_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.auth.v1.AuthService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.auth.v1.AuthService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

}

