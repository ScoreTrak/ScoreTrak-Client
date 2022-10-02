import { IHost } from "../../types/material_table";
import { Host } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/host/v1/host_pb";
import { UUID } from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {
  BoolValue,
  StringValue,
} from "google-protobuf/google/protobuf/wrappers_pb";

export function hostToIHost(host: Host): IHost {
  return {
    id: host.getId()?.getValue(),
    pause: host.getPause()?.getValue(),
    hide: host.getHide()?.getValue(),
    address: host.getAddress(),
    editHost: host.getEditHost()?.getValue(),
    hostGroupId: host.getHostGroupId()?.getValue(),
    teamId: host.getTeamId()?.getValue(),
    addressListRange: host.getAddressListRange()?.getValue(),
  };
}

export function IHostToHost(host: IHost): Host {
  const u = new Host();
  if (host.id && host.id !== "") u.setId(new UUID().setValue(host.id));
  if (host.hostGroupId && host.hostGroupId !== "")
    u.setHostGroupId(new UUID().setValue(host.hostGroupId));
  if (host.teamId && host.teamId !== "")
    u.setTeamId(new UUID().setValue(host.teamId));
  if (host.hide != null) u.setHide(new BoolValue().setValue(host.hide));
  if (host.pause != null) u.setPause(new BoolValue().setValue(host.pause));
  if (host.editHost != null)
    u.setEditHost(new BoolValue().setValue(host.editHost));
  if (host.addressListRange != null)
    u.setAddressListRange(new StringValue().setValue(host.addressListRange));
  u.setAddress(host.address);
  return u;
}

export function defaultIHost(): IHost {
  return {
    address: "",
    addressListRange: "",
    editHost: false,
    pause: false,
    hide: false,
    hostGroupId: undefined,
    id: undefined,
    teamId: undefined,
  };
}
