import * as jspb from 'google-protobuf'

import * as pkg_proto_config_v1_config_pb from '../../../../pkg/proto/config/v1/config_pb';
import * as pkg_proto_report_v1_report_pb from '../../../../pkg/proto/report/v1/report_pb';
import * as pkg_proto_host_group_v1_host_group_pb from '../../../../pkg/proto/host_group/v1/host_group_pb';
import * as pkg_proto_host_v1_host_pb from '../../../../pkg/proto/host/v1/host_pb';
import * as pkg_proto_team_v1_team_pb from '../../../../pkg/proto/team/v1/team_pb';
import * as pkg_proto_service_v1_service_pb from '../../../../pkg/proto/service/v1/service_pb';
import * as pkg_proto_service_group_v1_service_group_pb from '../../../../pkg/proto/service_group/v1/service_group_pb';
import * as pkg_proto_round_v1_round_pb from '../../../../pkg/proto/round/v1/round_pb';
import * as pkg_proto_property_v1_property_pb from '../../../../pkg/proto/property/v1/property_pb';
import * as pkg_proto_check_v1_check_pb from '../../../../pkg/proto/check/v1/check_pb';
import * as pkg_proto_user_v1_user_pb from '../../../../pkg/proto/user/v1/user_pb';
import * as pkg_proto_policy_v1_policy_pb from '../../../../pkg/proto/policy/v1/policy_pb';


export class Competition extends jspb.Message {
  getDynamicConfig(): pkg_proto_config_v1_config_pb.DynamicConfig | undefined;
  setDynamicConfig(value?: pkg_proto_config_v1_config_pb.DynamicConfig): Competition;
  hasDynamicConfig(): boolean;
  clearDynamicConfig(): Competition;

  getReport(): pkg_proto_report_v1_report_pb.Report | undefined;
  setReport(value?: pkg_proto_report_v1_report_pb.Report): Competition;
  hasReport(): boolean;
  clearReport(): Competition;

  getHostGroupsList(): Array<pkg_proto_host_group_v1_host_group_pb.HostGroup>;
  setHostGroupsList(value: Array<pkg_proto_host_group_v1_host_group_pb.HostGroup>): Competition;
  clearHostGroupsList(): Competition;
  addHostGroups(value?: pkg_proto_host_group_v1_host_group_pb.HostGroup, index?: number): pkg_proto_host_group_v1_host_group_pb.HostGroup;

  getHostsList(): Array<pkg_proto_host_v1_host_pb.Host>;
  setHostsList(value: Array<pkg_proto_host_v1_host_pb.Host>): Competition;
  clearHostsList(): Competition;
  addHosts(value?: pkg_proto_host_v1_host_pb.Host, index?: number): pkg_proto_host_v1_host_pb.Host;

  getTeamsList(): Array<pkg_proto_team_v1_team_pb.Team>;
  setTeamsList(value: Array<pkg_proto_team_v1_team_pb.Team>): Competition;
  clearTeamsList(): Competition;
  addTeams(value?: pkg_proto_team_v1_team_pb.Team, index?: number): pkg_proto_team_v1_team_pb.Team;

  getServicesList(): Array<pkg_proto_service_v1_service_pb.Service>;
  setServicesList(value: Array<pkg_proto_service_v1_service_pb.Service>): Competition;
  clearServicesList(): Competition;
  addServices(value?: pkg_proto_service_v1_service_pb.Service, index?: number): pkg_proto_service_v1_service_pb.Service;

  getServiceGroupsList(): Array<pkg_proto_service_group_v1_service_group_pb.ServiceGroup>;
  setServiceGroupsList(value: Array<pkg_proto_service_group_v1_service_group_pb.ServiceGroup>): Competition;
  clearServiceGroupsList(): Competition;
  addServiceGroups(value?: pkg_proto_service_group_v1_service_group_pb.ServiceGroup, index?: number): pkg_proto_service_group_v1_service_group_pb.ServiceGroup;

  getRoundsList(): Array<pkg_proto_round_v1_round_pb.Round>;
  setRoundsList(value: Array<pkg_proto_round_v1_round_pb.Round>): Competition;
  clearRoundsList(): Competition;
  addRounds(value?: pkg_proto_round_v1_round_pb.Round, index?: number): pkg_proto_round_v1_round_pb.Round;

  getPropertiesList(): Array<pkg_proto_property_v1_property_pb.Property>;
  setPropertiesList(value: Array<pkg_proto_property_v1_property_pb.Property>): Competition;
  clearPropertiesList(): Competition;
  addProperties(value?: pkg_proto_property_v1_property_pb.Property, index?: number): pkg_proto_property_v1_property_pb.Property;

  getChecksList(): Array<pkg_proto_check_v1_check_pb.Check>;
  setChecksList(value: Array<pkg_proto_check_v1_check_pb.Check>): Competition;
  clearChecksList(): Competition;
  addChecks(value?: pkg_proto_check_v1_check_pb.Check, index?: number): pkg_proto_check_v1_check_pb.Check;

  getUsersList(): Array<pkg_proto_user_v1_user_pb.User>;
  setUsersList(value: Array<pkg_proto_user_v1_user_pb.User>): Competition;
  clearUsersList(): Competition;
  addUsers(value?: pkg_proto_user_v1_user_pb.User, index?: number): pkg_proto_user_v1_user_pb.User;

  getPolicy(): pkg_proto_policy_v1_policy_pb.Policy | undefined;
  setPolicy(value?: pkg_proto_policy_v1_policy_pb.Policy): Competition;
  hasPolicy(): boolean;
  clearPolicy(): Competition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Competition.AsObject;
  static toObject(includeInstance: boolean, msg: Competition): Competition.AsObject;
  static serializeBinaryToWriter(message: Competition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Competition;
  static deserializeBinaryFromReader(message: Competition, reader: jspb.BinaryReader): Competition;
}

export namespace Competition {
  export type AsObject = {
    dynamicConfig?: pkg_proto_config_v1_config_pb.DynamicConfig.AsObject,
    report?: pkg_proto_report_v1_report_pb.Report.AsObject,
    hostGroupsList: Array<pkg_proto_host_group_v1_host_group_pb.HostGroup.AsObject>,
    hostsList: Array<pkg_proto_host_v1_host_pb.Host.AsObject>,
    teamsList: Array<pkg_proto_team_v1_team_pb.Team.AsObject>,
    servicesList: Array<pkg_proto_service_v1_service_pb.Service.AsObject>,
    serviceGroupsList: Array<pkg_proto_service_group_v1_service_group_pb.ServiceGroup.AsObject>,
    roundsList: Array<pkg_proto_round_v1_round_pb.Round.AsObject>,
    propertiesList: Array<pkg_proto_property_v1_property_pb.Property.AsObject>,
    checksList: Array<pkg_proto_check_v1_check_pb.Check.AsObject>,
    usersList: Array<pkg_proto_user_v1_user_pb.User.AsObject>,
    policy?: pkg_proto_policy_v1_policy_pb.Policy.AsObject,
  }
}

export class LoadCompetitionRequest extends jspb.Message {
  getCompetition(): Competition | undefined;
  setCompetition(value?: Competition): LoadCompetitionRequest;
  hasCompetition(): boolean;
  clearCompetition(): LoadCompetitionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadCompetitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoadCompetitionRequest): LoadCompetitionRequest.AsObject;
  static serializeBinaryToWriter(message: LoadCompetitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadCompetitionRequest;
  static deserializeBinaryFromReader(message: LoadCompetitionRequest, reader: jspb.BinaryReader): LoadCompetitionRequest;
}

export namespace LoadCompetitionRequest {
  export type AsObject = {
    competition?: Competition.AsObject,
  }
}

export class LoadCompetitionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadCompetitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoadCompetitionResponse): LoadCompetitionResponse.AsObject;
  static serializeBinaryToWriter(message: LoadCompetitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadCompetitionResponse;
  static deserializeBinaryFromReader(message: LoadCompetitionResponse, reader: jspb.BinaryReader): LoadCompetitionResponse;
}

export namespace LoadCompetitionResponse {
  export type AsObject = {
  }
}

export class FetchCoreCompetitionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchCoreCompetitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchCoreCompetitionRequest): FetchCoreCompetitionRequest.AsObject;
  static serializeBinaryToWriter(message: FetchCoreCompetitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchCoreCompetitionRequest;
  static deserializeBinaryFromReader(message: FetchCoreCompetitionRequest, reader: jspb.BinaryReader): FetchCoreCompetitionRequest;
}

export namespace FetchCoreCompetitionRequest {
  export type AsObject = {
  }
}

export class FetchCoreCompetitionResponse extends jspb.Message {
  getCompetition(): Competition | undefined;
  setCompetition(value?: Competition): FetchCoreCompetitionResponse;
  hasCompetition(): boolean;
  clearCompetition(): FetchCoreCompetitionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchCoreCompetitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchCoreCompetitionResponse): FetchCoreCompetitionResponse.AsObject;
  static serializeBinaryToWriter(message: FetchCoreCompetitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchCoreCompetitionResponse;
  static deserializeBinaryFromReader(message: FetchCoreCompetitionResponse, reader: jspb.BinaryReader): FetchCoreCompetitionResponse;
}

export namespace FetchCoreCompetitionResponse {
  export type AsObject = {
    competition?: Competition.AsObject,
  }
}

export class FetchEntireCompetitionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchEntireCompetitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchEntireCompetitionRequest): FetchEntireCompetitionRequest.AsObject;
  static serializeBinaryToWriter(message: FetchEntireCompetitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchEntireCompetitionRequest;
  static deserializeBinaryFromReader(message: FetchEntireCompetitionRequest, reader: jspb.BinaryReader): FetchEntireCompetitionRequest;
}

export namespace FetchEntireCompetitionRequest {
  export type AsObject = {
  }
}

export class FetchEntireCompetitionResponse extends jspb.Message {
  getCompetition(): Competition | undefined;
  setCompetition(value?: Competition): FetchEntireCompetitionResponse;
  hasCompetition(): boolean;
  clearCompetition(): FetchEntireCompetitionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchEntireCompetitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchEntireCompetitionResponse): FetchEntireCompetitionResponse.AsObject;
  static serializeBinaryToWriter(message: FetchEntireCompetitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchEntireCompetitionResponse;
  static deserializeBinaryFromReader(message: FetchEntireCompetitionResponse, reader: jspb.BinaryReader): FetchEntireCompetitionResponse;
}

export namespace FetchEntireCompetitionResponse {
  export type AsObject = {
    competition?: Competition.AsObject,
  }
}

export class ResetScoresRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetScoresRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ResetScoresRequest): ResetScoresRequest.AsObject;
  static serializeBinaryToWriter(message: ResetScoresRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetScoresRequest;
  static deserializeBinaryFromReader(message: ResetScoresRequest, reader: jspb.BinaryReader): ResetScoresRequest;
}

export namespace ResetScoresRequest {
  export type AsObject = {
  }
}

export class ResetScoresResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetScoresResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResetScoresResponse): ResetScoresResponse.AsObject;
  static serializeBinaryToWriter(message: ResetScoresResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetScoresResponse;
  static deserializeBinaryFromReader(message: ResetScoresResponse, reader: jspb.BinaryReader): ResetScoresResponse;
}

export namespace ResetScoresResponse {
  export type AsObject = {
  }
}

export class DeleteCompetitionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCompetitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCompetitionRequest): DeleteCompetitionRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteCompetitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCompetitionRequest;
  static deserializeBinaryFromReader(message: DeleteCompetitionRequest, reader: jspb.BinaryReader): DeleteCompetitionRequest;
}

export namespace DeleteCompetitionRequest {
  export type AsObject = {
  }
}

export class DeleteCompetitionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCompetitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCompetitionResponse): DeleteCompetitionResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteCompetitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCompetitionResponse;
  static deserializeBinaryFromReader(message: DeleteCompetitionResponse, reader: jspb.BinaryReader): DeleteCompetitionResponse;
}

export namespace DeleteCompetitionResponse {
  export type AsObject = {
  }
}

