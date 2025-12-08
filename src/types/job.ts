export type Status = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface Job {
  id: string;
  company: string;
  title: string;
  status: Status;
  date: string; // ISO date string
  notes?: string;
}

export type ColumnType = {
  id: Status;
  title: string;
};
