/**
 * @fileoverview gRPC-Web generated client stub for grpc.health.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as grpc_health_v1_health_pb from '../../../grpc/health/v1/health_pb';


export class HealthClient {
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

  methodDescriptorCheck = new grpcWeb.MethodDescriptor(
    '/grpc.health.v1.Health/Check',
    grpcWeb.MethodType.UNARY,
    grpc_health_v1_health_pb.HealthCheckRequest,
    grpc_health_v1_health_pb.HealthCheckResponse,
    (request: grpc_health_v1_health_pb.HealthCheckRequest) => {
      return request.serializeBinary();
    },
    grpc_health_v1_health_pb.HealthCheckResponse.deserializeBinary
  );

  check(
    request: grpc_health_v1_health_pb.HealthCheckRequest,
    metadata: grpcWeb.Metadata | null): Promise<grpc_health_v1_health_pb.HealthCheckResponse>;

  check(
    request: grpc_health_v1_health_pb.HealthCheckRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: grpc_health_v1_health_pb.HealthCheckResponse) => void): grpcWeb.ClientReadableStream<grpc_health_v1_health_pb.HealthCheckResponse>;

  check(
    request: grpc_health_v1_health_pb.HealthCheckRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: grpc_health_v1_health_pb.HealthCheckResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/grpc.health.v1.Health/Check',
        request,
        metadata || {},
        this.methodDescriptorCheck,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/grpc.health.v1.Health/Check',
    request,
    metadata || {},
    this.methodDescriptorCheck);
  }

  methodDescriptorWatch = new grpcWeb.MethodDescriptor(
    '/grpc.health.v1.Health/Watch',
    grpcWeb.MethodType.SERVER_STREAMING,
    grpc_health_v1_health_pb.HealthCheckRequest,
    grpc_health_v1_health_pb.HealthCheckResponse,
    (request: grpc_health_v1_health_pb.HealthCheckRequest) => {
      return request.serializeBinary();
    },
    grpc_health_v1_health_pb.HealthCheckResponse.deserializeBinary
  );

  watch(
    request: grpc_health_v1_health_pb.HealthCheckRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<grpc_health_v1_health_pb.HealthCheckResponse> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/grpc.health.v1.Health/Watch',
      request,
      metadata || {},
      this.methodDescriptorWatch);
  }

}

