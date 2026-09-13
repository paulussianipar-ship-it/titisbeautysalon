export type Patient = {
  id: string;
  name: string;
  contact: string;
  email?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  position: string;
  contact?: string;
};

export type Sale = {
  id: string;
  date: string;
  service: string;
  customer: string;
  amount: number;
};
