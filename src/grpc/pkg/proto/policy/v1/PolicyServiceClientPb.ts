/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.policy.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_policy_v1_policy_pb from '../../../../pkg/proto/policy/v1/policy_pb';


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

  methodInfoGet = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_policy_v1_policy_pb.GetResponse,
    (request: pkg_proto_policy_v1_policy_pb.GetRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_policy_v1_policy_pb.GetResponse.deserializeBinary
  );

  get(
    request: pkg_proto_policy_v1_policy_pb.GetRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pkg.proto.policy.v1.PolicyService/Get',
      request,
      metadata || {},
      this.methodInfoGet);
  }

  methodInfoUpdate = new grpcWeb.AbstractClientBase.MethodInfo(
    pkg_proto_policy_v1_policy_pb.UpdateResponse,
    (request: pkg_proto_policy_v1_policy_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_policy_v1_policy_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: pkg_proto_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<pkg_proto_policy_v1_policy_pb.UpdateResponse>;

  update(
    request: pkg_proto_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: pkg_proto_policy_v1_policy_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<pkg_proto_policy_v1_policy_pb.UpdateResponse>;

  update(
    request: pkg_proto_policy_v1_policy_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: pkg_proto_policy_v1_policy_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pkg.proto.policy.v1.PolicyService/Update',
        request,
        metadata || {},
        this.methodInfoUpdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pkg.proto.policy.v1.PolicyService/Update',
    request,
    metadata || {},
    this.methodInfoUpdate);
  }

}

