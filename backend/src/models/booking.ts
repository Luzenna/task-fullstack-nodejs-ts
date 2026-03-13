export interface Booking {
  id: number;
  roomId: number;
  customerName: string;
  customerEmail: string;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
}
