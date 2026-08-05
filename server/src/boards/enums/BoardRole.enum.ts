export enum BoardRole {
  MEMBER = "member",
  OWNER = "owner",
  ADMIN = "admin",
}

export const ROLE_RANK: Record<BoardRole, number> = {
  [BoardRole.OWNER]: 3,
  [BoardRole.ADMIN]: 2,
  [BoardRole.MEMBER]: 1,
};
