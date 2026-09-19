export type RequestType = 'VOLUNTEER' | 'SUPPORT_REQUEST';

export interface VolunteerContact {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  interestArea: string | null;
  message: string | null;
  requestType: RequestType;
  sentAt: string;
}

export interface VolunteerContactRequest {
  name: string;
  phone: string;
  email?: string;
  interestArea?: string;
  message?: string;
  requestType: RequestType;
}
