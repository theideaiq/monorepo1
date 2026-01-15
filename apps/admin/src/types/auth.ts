// biome-ignore lint/style/useImportType: ROLES is used as a value in typeof
import { ROLES } from '@/lib/constants';

export type UserRole = typeof ROLES.USER | typeof ROLES.ADMIN | typeof ROLES.SUPERADMIN;

export interface UserProfile {
  id: string;
  email?: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
  banned?: boolean;
}
