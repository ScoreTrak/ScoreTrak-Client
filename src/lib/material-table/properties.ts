import {
  Property,
  Status,
} from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/property/v1/property_pb";
import { IProperty, IPropertyStatus } from "../../types/material_table";
import { UUID } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/proto/v1/uuid_pb";

function statusToPropertyStatus(status: Status): IPropertyStatus | undefined {
  if (status === Status.STATUS_VIEW) return IPropertyStatus.View;
  if (status === Status.STATUS_EDIT) return IPropertyStatus.Edit;
  if (status === Status.STATUS_HIDE) return IPropertyStatus.Hide;
  return undefined;
}

function propertyStatusToStatus(status: IPropertyStatus | undefined): Status {
  if (status === IPropertyStatus.View) return Status.STATUS_VIEW;
  if (status === IPropertyStatus.Hide) return Status.STATUS_HIDE;
  if (status === IPropertyStatus.Edit) return Status.STATUS_EDIT;
  return Status.STATUS_UNSPECIFIED;
}

export function propertyToIProperty(property: Property): IProperty {
  return {
    key: property.getKey(),
    value: property.getValue()?.getValue(),
    serviceId: property.getServiceId()?.getValue(),
    status: statusToPropertyStatus(property.getStatus()),
  };
}

export function IPropertyToProperty(property: IProperty): Property {
  const u = new Property();
  if (property.serviceId && property.serviceId !== "")
    u.setServiceId(new UUID().setValue(property.serviceId));
  u.setKey(property.key);
  if (property.value && property.value !== "")
    u.setValue(new UUID().setValue(property.value));
  u.setStatus(propertyStatusToStatus(property.status));
  return u;
}
