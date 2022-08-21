import {HostGroup} from "../scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import {IHostGroup} from "../../types/material_table";
import {BoolValue} from "google-protobuf/google/protobuf/wrappers_pb";
import {UUID} from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function hostGroupToIHostGroup(hostGroup: HostGroup): IHostGroup {
    return {
        pause: hostGroup.getPause()?.getValue(),
        hide: hostGroup.getHide()?.getValue(),
        id: hostGroup.getId()?.getValue(),
        name: hostGroup.getName()
    }
}

export function IHostGroupToHostGroup(hostGroup: IHostGroup): HostGroup {
    const t = new HostGroup()
    if (hostGroup.pause != null ) t.setPause(new BoolValue().setValue(hostGroup.pause))
    if (hostGroup.hide != null ) t.setHide(new BoolValue().setValue(hostGroup.hide))
    if (hostGroup.id && hostGroup.id !== "") t.setId((new UUID().setValue(hostGroup.id)))
    t.setName(hostGroup.name)
    return t
}
