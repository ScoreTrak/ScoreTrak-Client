import { IUser, UserRole } from "../../types/material_table";
import { Role, User } from "../scoretrakapis/scoretrak/user/v1/user_pb";
import { UUID } from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";

export function userToIUser(user: User): IUser {
  return {
    id: user.getId()?.getValue(),
    password: user.getPassword(),
    passwordHash: user.getPasswordHash(),
    role: roleToUserRole(user.getRole()),
    teamId: user.getTeamId()?.getValue(),
    username: user.getUsername(),
  };
}

export function IUserToUser(user: IUser): User {
  const u = new User();
  if (user.id && user.id !== "") u.setId(new UUID().setValue(user.id));
  u.setPassword(user.password);
  u.setUsername(user.username);
  u.setRole(userRoleToRole(user.role));
  if (user.teamId && user.teamId !== "")
    u.setTeamId(new UUID().setValue(user.teamId));
  return u;
}

export function roleToUserRole(role: Role): UserRole | undefined {
  if (role === Role.ROLE_BLUE) return UserRole.Blue;
  if (role === Role.ROLE_BLACK) return UserRole.Black;
  if (role === Role.ROLE_RED) return UserRole.Red;
  return undefined;
}

export function userRoleToRole(role: UserRole | undefined): Role {
  if (role === UserRole.Blue) return Role.ROLE_BLUE;
  if (role === UserRole.Black) return Role.ROLE_BLACK;
  if (role === UserRole.Red) return Role.ROLE_RED;
  return Role.ROLE_UNSPECIFIED;
}
