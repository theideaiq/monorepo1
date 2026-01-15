export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
  STUDENT: 'student',
} as const;

export const CRM_STATUSES = {
  LEAD: 'lead',
  CUSTOMER: 'customer',
  CHURNED: 'churned',
  VIP: 'vip',
} as const;

export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENT: 'sent',
  FAILED: 'failed',
} as const;
