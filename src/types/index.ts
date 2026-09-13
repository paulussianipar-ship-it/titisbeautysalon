export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
}