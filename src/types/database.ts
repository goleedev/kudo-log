export type EntryType = 'praise' | 'small_win' | 'learning';

export interface Entry {
  id: string;
  user_id: string;
  type: EntryType;
  title: string;
  detail: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface MicroSummary {
  id: string;
  entry_id: string;
  action: string;
  impact: string | null;
  evidence: string | null;
  tokens_used: number | null;
  created_at: string;
}
