export const VALID_ROLES = {
  admin: 'admin',
  superUser: 'superUser',
  user: 'user',
} as const;

export type ValidRoles = (typeof VALID_ROLES)[keyof typeof VALID_ROLES];
