/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.policy.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as scoretrak_policy_v1_policy_pb from '../../../scoretrak/policy/v1/policy_pb';


export class PolicyServiceClient {
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

  methodDescriptorGet = new grpcWeb.MethodDescriptor(
    '/scoretrak.policy.v1.PolicyService/Get',
    grpcWeb.MethodType.SERVER_STREAMING,
    scoretrak_policy_v1_policy_pb.GetRequest,
    scoretrak_policy_v1_policy_pb.GetResponse,
    (request: scoretrak_policy_v1_policy_pb.GetRequest) => {
      return request.serializeBinary();
    },
    scoretrak_policy_v1_policy_pb.GetResponse.deserializeBinary
  );

  get(
    request: scoretrak_policy_v1_policy_pb.GetRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<scoretrak_policy_v1_policy_pb.GetResponse> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/scoretrak.policy.v1.PolicyService/Get',
      request,
      metadata || {},
      this.methodDescriptorGet);
  }

  methodDescriptorUpdate = new grpcWeb.MethodDescriptor(
    '/scoretrak.policy.v1.PolicyService/Update',
    grpcWeb.MethodType.UNARY,
    scoretrak_policy_v1_policy_pb.UpdateRequest,
    scoretrak_policy_v1_policy_pb.UpdateResponse,
    (request: scoretrak_policy_v1_policy_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_policy_v1_policy_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<scoretrak_policy_v1_policy_pb.UpdateResponse>;

  update(
    request: scoretrak_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: scoretrak_policy_v1_policy_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<scoretrak_policy_v1_policy_pb.UpdateResponse>;

  update(
    request: scoretrak_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: scoretrak_policy_v1_policy_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/scoretrak.policy.v1.PolicyService/Update',
        request,
        metadata || {},
        this.methodDescriptorUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/scoretrak.policy.v1.PolicyService/Update',
    request,
    metadata || {},
    this.methodDescriptorUpdate);
  }

}

