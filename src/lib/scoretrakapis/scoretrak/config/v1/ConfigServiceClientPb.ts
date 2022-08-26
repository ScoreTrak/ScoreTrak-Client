/**
 * @fileoverview gRPC-Web generated client stub for scoretrak.config.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

import * as grpcWeb from "grpc-web";

import * as scoretrak_config_v1_config_pb from "../../../scoretrak/config/v1/config_pb";

export class DynamicConfigServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string };
  options_: null | { [index: string]: any };

  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options["format"] = "text";

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGet = new grpcWeb.MethodDescriptor(
    "/scoretrak.config.v1.DynamicConfigService/Get",
    grpcWeb.MethodType.UNARY,
    scoretrak_config_v1_config_pb.GetRequest,
    scoretrak_config_v1_config_pb.GetResponse,
    (request: scoretrak_config_v1_config_pb.GetRequest) => {
      return request.serializeBinary();
    },
    scoretrak_config_v1_config_pb.GetResponse.deserializeBinary
  );

  get(
    request: scoretrak_config_v1_config_pb.GetRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_config_v1_config_pb.GetResponse>;

  get(
    request: scoretrak_config_v1_config_pb.GetRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.GetResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_config_v1_config_pb.GetResponse>;

  get(
    request: scoretrak_config_v1_config_pb.GetRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.GetResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ + "/scoretrak.config.v1.DynamicConfigService/Get",
        request,
        metadata || {},
        this.methodDescriptorGet,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ + "/scoretrak.config.v1.DynamicConfigService/Get",
      request,
      metadata || {},
      this.methodDescriptorGet
    );
  }

  methodDescriptorUpdate = new grpcWeb.MethodDescriptor(
    "/scoretrak.config.v1.DynamicConfigService/Update",
    grpcWeb.MethodType.UNARY,
    scoretrak_config_v1_config_pb.UpdateRequest,
    scoretrak_config_v1_config_pb.UpdateResponse,
    (request: scoretrak_config_v1_config_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    scoretrak_config_v1_config_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: scoretrak_config_v1_config_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_config_v1_config_pb.UpdateResponse>;

  update(
    request: scoretrak_config_v1_config_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.UpdateResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_config_v1_config_pb.UpdateResponse>;

  update(
    request: scoretrak_config_v1_config_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.UpdateResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ + "/scoretrak.config.v1.DynamicConfigService/Update",
        request,
        metadata || {},
        this.methodDescriptorUpdate,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ + "/scoretrak.config.v1.DynamicConfigService/Update",
      request,
      metadata || {},
      this.methodDescriptorUpdate
    );
  }
}

export class StaticConfigServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string };
  options_: null | { [index: string]: any };

  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options["format"] = "text";

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGet = new grpcWeb.MethodDescriptor(
    "/scoretrak.config.v1.StaticConfigService/Get",
    grpcWeb.MethodType.UNARY,
    scoretrak_config_v1_config_pb.GetStaticConfigRequest,
    scoretrak_config_v1_config_pb.GetStaticConfigResponse,
    (request: scoretrak_config_v1_config_pb.GetStaticConfigRequest) => {
      return request.serializeBinary();
    },
    scoretrak_config_v1_config_pb.GetStaticConfigResponse.deserializeBinary
  );

  get(
    request: scoretrak_config_v1_config_pb.GetStaticConfigRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<scoretrak_config_v1_config_pb.GetStaticConfigResponse>;

  get(
    request: scoretrak_config_v1_config_pb.GetStaticConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.GetStaticConfigResponse
    ) => void
  ): grpcWeb.ClientReadableStream<scoretrak_config_v1_config_pb.GetStaticConfigResponse>;

  get(
    request: scoretrak_config_v1_config_pb.GetStaticConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.RpcError,
      response: scoretrak_config_v1_config_pb.GetStaticConfigResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ + "/scoretrak.config.v1.StaticConfigService/Get",
        request,
        metadata || {},
        this.methodDescriptorGet,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ + "/scoretrak.config.v1.StaticConfigService/Get",
      request,
      metadata || {},
      this.methodDescriptorGet
    );
  }
}
