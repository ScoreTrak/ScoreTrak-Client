import {ServiceGroup} from "../scoretrakapis/scoretrak/service_group/v1/service_group_pb";
import {IServiceGroup} from "../../types/material_table";
import {BoolValue} from "google-protobuf/google/protobuf/wrappers_pb";
import {UUID} from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function serviceGroupToIServiceGroup(serviceGroup: ServiceGroup): IServiceGroup{
    return {
        enabled: serviceGroup.getEnabled()?.getValue(),
        id: serviceGroup.getId()?.getValue(),
        name: serviceGroup.getName(),
        displayName: serviceGroup.getDisplayName(),
        label: serviceGroup.getLabel(),
        skipHelper: serviceGroup.getSkipHelper()
    }
}

export function IServiceGroupToServiceGroup(serviceGroup: IServiceGroup): ServiceGroup{
    const t = new ServiceGroup()
    if (serviceGroup.enabled != null ) t.setEnabled(new BoolValue().setValue(serviceGroup.enabled))
    if (serviceGroup.id && serviceGroup.id !== "") t.setId((new UUID().setValue(serviceGroup.id)))
    t.setDisplayName(serviceGroup.displayName)
    t.setLabel(serviceGroup.label)
    t.setName(serviceGroup.name)
    t.setSkipHelper(serviceGroup.skipHelper)
    return t
}