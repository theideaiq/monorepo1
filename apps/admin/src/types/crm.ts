// biome-ignore lint/style/useImportType: Constants are used as values in typeof
import { CAMPAIGN_STATUSES, CRM_STATUSES, ROLES } from '@/lib/constants';

export type CRMStatus = typeof CRM_STATUSES[keyof typeof CRM_STATUSES];
export type UserRole = typeof ROLES[keyof typeof ROLES];

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRole | string;
  updated_at?: string;
  crm_tags: string[] | null;
  crm_status: CRMStatus | null;
}

export interface MarketingSegment {
  id: string;
  name: string;
  criteria: {
    role?: string;
    crm_status?: CRMStatus;
    [key: string]: any;
  };
  created_at: string;
}

export type CampaignStatus = typeof CAMPAIGN_STATUSES[keyof typeof CAMPAIGN_STATUSES];

export interface MarketingCampaign {
  id: string;
  subject: string;
  body_html: string;
  segment_id: string;
  status: CampaignStatus;
  sent_count: number;
  sent_at: string | null;
  created_at: string;

  // Optional join fields
  segment?: MarketingSegment;
}
