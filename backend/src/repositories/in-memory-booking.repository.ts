import type { Room } from '../models/room.js';
import type { Booking } from '../models/booking.js';
import type { IBookingRepository } from './booking.repository.js';

export class InMemoryBookingRepository implements IBookingRepository {
  private readonly rooms: Room[];
  private readonly bookings: Booking[];
  private nextBookingId: number;

  constructor() {
    this.rooms = [
      { id: 1, name: 'Ocean View Suite', category: 'Suite', pricePerNight: 450, capacity: 2, imageUrl: '/images/suite-1.svg' },
      { id: 2, name: 'Garden Room', category: 'Double', pricePerNight: 200, capacity: 2, imageUrl: '/images/double-1.svg' },
      { id: 3, name: 'City Single', category: 'Single', pricePerNight: 120, capacity: 1, imageUrl: '/images/single-1.svg' },
      { id: 4, name: 'Family Suite', category: 'Suite', pricePerNight: 550, capacity: 4, imageUrl: '/images/suite-2.svg' },
      { id: 5, name: 'Budget Double', category: 'Double', pricePerNight: 150, capacity: 2, imageUrl: '/images/double-2.svg' },
      { id: 6, name: 'Penthouse', category: 'Suite', pricePerNight: 800, capacity: 2, imageUrl: '/images/suite-3.svg' },
    ];

    const now = new Date();
    this.bookings = [
      { id: 1, roomId: 1, customerName: 'Alice Smith', customerEmail: 'alice@example.com', checkIn: new Date(2026, 2, 10), checkOut: new Date(2026, 2, 15), createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
      { id: 2, roomId: 2, customerName: 'Bob Jones', customerEmail: 'bob@example.com', checkIn: new Date(2026, 2, 5), checkOut: new Date(2026, 2, 8), createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
      { id: 3, roomId: 3, customerName: 'Carol White', customerEmail: 'carol@example.com', checkIn: new Date(2026, 2, 12), checkOut: new Date(2026, 2, 14), createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
    ];

    this.nextBookingId = 4;
  }

  getAllRooms(): Room[] {
    return [...this.rooms];
  }

  getRoomById(id: number): Room | null {
    return this.rooms.find((r) => r.id === id) ?? null;
  }

  getBookingsForRoom(roomId: number): Booking[] {
    return this.bookings.filter((b) => b.roomId === roomId);
  }

  getBookingsForRoomInRange(roomId: number, from: Date, to: Date): Booking[] {
    return this.bookings.filter(
      (b) => b.roomId === roomId && b.checkIn < to && b.checkOut > from,
    );
  }

  isRoomAvailable(roomId: number, checkIn: Date, checkOut: Date): boolean {
    // A room is available if no existing booking overlaps with the requested dates
    return !this.bookings.some(
      (b) => b.roomId === roomId && b.checkIn < checkOut && b.checkOut > checkIn,
    );
  }

  getAvailableRooms(checkIn: Date, checkOut: Date): Room[] {
    const bookedRoomIds = new Set(
      this.bookings
        .filter((b) => b.checkIn < checkOut && b.checkOut > checkIn)
        .map((b) => b.roomId),
    );

    return this.rooms.filter((r) => !bookedRoomIds.has(r.id));
  }

  createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    // Node.js is single-threaded, so no lock needed (unlike the .NET version).
    // However, we still double-check availability to be safe.
    if (!this.isRoomAvailable(booking.roomId, booking.checkIn, booking.checkOut)) {
      throw new Error('Room is not available for the selected dates');
    }

    const newBooking: Booking = {
      ...booking,
      id: this.nextBookingId++,
      createdAt: new Date(),
    };

    this.bookings.push(newBooking);
    return newBooking;
  }
}
