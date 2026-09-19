export type DonationStatus = 'NEEDED' | 'PARTIALLY_MET' | 'MET';

export interface DonationNeed {
  id: number;
  title: string;
  description: string | null;
  category: string;
  targetQuantity: number;
  currentQuantity: number;
  status: DonationStatus;
  createdAt: string;
}

export interface DonationNeedRequest {
  title: string;
  description?: string;
  category: string;
  targetQuantity: number;
  currentQuantity?: number;
  status?: DonationStatus;
}
