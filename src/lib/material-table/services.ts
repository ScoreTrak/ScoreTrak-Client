import { Service } from "../scoretrakapis/scoretrak/service/v1/service_pb";
import { IService } from "../../types/material_table";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {
  BoolValue,
  UInt64Value,
} from "google-protobuf/google/protobuf/wrappers_pb";

export function serviceToIService(service: Service): IService {
  return {
    displayName: service.getDisplayName(),
    pause: service.getPause()?.getValue(),
    hide: service.getHide()?.getValue(),
    hostId: service.getHostId()?.getValue(),
    id: service.getId()?.getValue(),
    name: service.getName(),
    pointsBoost: service.getPointsBoost()?.getValue(),
    roundDelay: service.getRoundDelay()?.getValue(),
    roundUnits: service.getRoundUnits(),
    serviceGroupId: service.getServiceGroupId()?.getValue(),
    weight: service.getWeight()?.getValue(),
  };
}

export function IServiceToService(service: IService): Service {
  const u = new Service();
  if (service.id && service.id !== "") u.setId(new UUID().setValue(service.id));
  u.setDisplayName(service.displayName);
  if (service.hostId && service.hostId !== "")
    u.setHostId(new UUID().setValue(service.hostId));
  if (service.serviceGroupId && service.serviceGroupId !== "")
    u.setServiceGroupId(new UUID().setValue(service.serviceGroupId));
  if (service.pause != null)
    u.setPause(new BoolValue().setValue(service.pause));
  if (service.hide != null) u.setHide(new BoolValue().setValue(service.hide));
  u.setName(service.name);
  if (service.weight != null && !isNaN(service.weight))
    u.setWeight(new UInt64Value().setValue(service.weight));
  u.setRoundUnits(service.roundUnits);
  if (service.roundDelay != null && !isNaN(service.roundDelay))
    u.setRoundDelay(new UInt64Value().setValue(service.roundDelay));
  if (service.pointsBoost != null && !isNaN(service.pointsBoost))
    u.setPointsBoost(new UInt64Value().setValue(service.pointsBoost));
  return u;
}
