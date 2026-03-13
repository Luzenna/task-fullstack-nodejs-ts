import type { Room } from '../models/room.js';
import type { Booking } from '../models/booking.js';

export interface IBookingRepository {
  getAllRooms(): Room[];
  getRoomById(id: number): Room | null;
  getBookingsForRoom(roomId: number): Booking[];
  getBookingsForRoomInRange(roomId: number, from: Date, to: Date): Booking[];
  createBooking(booking: Omit<Booking, 'id'>): Booking;
  isRoomAvailable(roomId: number, checkIn: Date, checkOut: Date): boolean;
  getAvailableRooms(checkIn: Date, checkOut: Date): Room[];
}
