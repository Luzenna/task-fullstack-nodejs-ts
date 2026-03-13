export interface CreateBookingRequest {
  roomId: number;
  customerName: string;
  customerEmail: string;
  checkIn: string;
  checkOut: string;
}
