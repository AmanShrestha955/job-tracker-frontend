export type GetAllApplicationDataParams = {
  search?: string;
  status?: string;
  limit: number;
  offset: number;
};

export type Status = "Applied" | "Interviewing" | "Offer" | "Rejected";
export type Job_Type = "Internship" | "Full-time" | "Part-time";

export type getApplicationData = {
  id: number;
  company_name: string;
  job_title: string;
  job_type: Job_Type;
  status: Status;
  applied_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type AllApplicationData = {
  id: number;
  company_name: string;
  job_title: string;
  applied_date: string;
};

export type GetAllApplicationDataResponse = {
  applications: AllApplicationData[];
  total: number;
  currentPage: number;
  totalPages: number;
};

export type CreateApplicationFormData = {
  company_name: string;
  job_title: string;
  job_type: Job_Type;
  status: Status;
  applied_date: string;
  notes?: string;
};

export type Message = string;
