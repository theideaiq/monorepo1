export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
  STUDENT: 'student',
} as const;

export const CRM_STATUSES = {
  LEAD: 'lead',
  CUSTOMER: 'customer',
  VIP: 'vip',
  CHURNED: 'churned',
} as const;

export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENT: 'sent',
  FAILED: 'failed',
} as const;
