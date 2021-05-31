/**
 * @fileoverview gRPC-Web generated client stub for pkg.proto.report.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pkg_proto_report_v1_report_pb from '../../../../pkg/proto/report/v1/report_pb';


export class ReportServiceClient {
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
    pkg_proto_report_v1_report_pb.GetResponse,
    (request: pkg_proto_report_v1_report_pb.GetRequest) => {
      return request.serializeBinary();
    },
    pkg_proto_report_v1_report_pb.GetResponse.deserializeBinary
  );

  get(
    request: pkg_proto_report_v1_report_pb.GetRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pkg.proto.report.v1.ReportService/Get',
      request,
      metadata || {},
      this.methodInfoGet);
  }

}

