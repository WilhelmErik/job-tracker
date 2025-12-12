export type Status = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
export type JobSource = "LINKEDIN" | "INDEED"| "COMPANY_SITE"| "GLASSDOOR"|"REFERRAL"|"OTHER";

export interface Job {
  id: string;
  company: string;
  title: string;
  status: Status;
  source:JobSource;
  date: string; // ISO date string

  notes?: string;
}

export type ColumnType = {
  id: Status;
  title: string;
};
