export interface IHost {
  id: string | undefined;
  pause: boolean | undefined;
  hide: boolean | undefined;
  editHost: boolean | undefined;
  address: string;
  addressListRange: string | undefined;
  hostGroupId: string | undefined;
  teamId: string | undefined;
}

export interface IHostGroup {
  id: string | undefined;
  pause: boolean | undefined;
  hide: boolean | undefined;
  name: string;
}

export enum IPropertyStatus {
  View = "View",
  Hide = "Hide",
  Edit = "Edit",
}

export interface IProperty {
  key: string;
  serviceId: string | undefined;
  value: string | undefined;
  status: IPropertyStatus | undefined;
}

export interface IRound {
  id: number;
  start: Date | undefined;
  finish: Date | undefined;
  note: string;
  err: string;
}

export interface IService {
  id: string | undefined;
  name: string;
  displayName: string;
  roundUnits: number;
  roundDelay: number | undefined;
  pointsBoost: number | undefined;
  serviceGroupId: string | undefined;
  hostId: string | undefined;
  weight: number | undefined;
  pause: boolean | undefined;
  hide: boolean | undefined;
}

export interface IServiceGroup {
  id: string | undefined;
  name: string;
  displayName: string;
  label: string;
  enabled: boolean | undefined;
  skipHelper: boolean;
}

export interface ITeam {
  id: string | undefined;
  name: string;
  index: number | undefined;
  pause: boolean | undefined;
  hide: boolean | undefined;
}

export enum UserRole {
  Red = "red",
  Black = "black",
  Blue = "blue",
}

export interface IUser {
  id: string | undefined;
  username: string;
  password: string;
  passwordHash: string | undefined;
  teamId: string | undefined;
  role: UserRole | undefined;
}

export interface ICheck {

}