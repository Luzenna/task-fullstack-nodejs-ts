import type Database from 'better-sqlite3';
import type { Room } from '../models/room.js';
import type { Booking } from '../models/booking.js';
import type { IBookingRepository } from './booking.repository.js';

interface RoomRow {
  id: number;
  name: string;
  category: string;
  price_per_night: number;
  capacity: number;
  image_url: string;
}

interface BookingRow {
  id: number;
  room_id: number;
  customer_name: string;
  customer_email: string;
  check_in: string;
  check_out: string;
  created_at: string;
}

function mapRoom(row: RoomRow): Room {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Room['category'],
    pricePerNight: row.price_per_night,
    capacity: row.capacity,
    imageUrl: row.image_url,
  };
}

function mapBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    roomId: row.room_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    checkIn: new Date(row.check_in),
    checkOut: new Date(row.check_out),
    createdAt: new Date(row.created_at),
  };
}

export class SqliteBookingRepository implements IBookingRepository {
  private readonly db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  // DONE: Get all rooms
  getAllRooms(): Room[] {
    const rows = this.db.prepare('SELECT * FROM rooms').all() as RoomRow[];
    return rows.map(mapRoom);
  }

  // DONE: Get room by ID
  getRoomById(id: number): Room | null {
    const row = this.db.prepare('SELECT * FROM rooms WHERE id = ?').get(id) as RoomRow | undefined;
    return row == null ? null : mapRoom(row);
  }

  // DONE: Get all bookings for a room
  getBookingsForRoom(roomId: number): Booking[] {
    const rows = this.db.prepare('SELECT * FROM bookings WHERE room_id = ?').all(roomId) as BookingRow[];
    return rows.map(mapBooking);
  }

  // TODO: Get bookings for a room that overlap with the given date range.
  //
  // A booking overlaps if: booking.check_in < `to` AND booking.check_out > `from`
  //
  // Hints:
  // - Dates are stored as ISO 8601 strings in SQLite (e.g. '2026-03-10T00:00:00.000Z')
  // - ISO 8601 strings sort lexicographically, so you can use < and > directly in SQL
  // - Convert Date params to ISO strings with .toISOString()
  //
  getBookingsForRoomInRange(roomId: number, from: Date, to: Date): Booking[] {
    // TODO: Implement this query
    return [];
  }

  // TODO: Check if a room is available for the given date range.
  //
  // A room is available if NO existing bookings overlap with the requested dates.
  //
  // Hints:
  // - You can use a COUNT query or check if any rows exist
  // - Reuse the same overlap logic: check_in < checkOut AND check_out > checkIn
  //
  isRoomAvailable(roomId: number, checkIn: Date, checkOut: Date): boolean {
    // TODO: Implement this query
    return true;
  }

  // TODO: Get all rooms that are available for the given date range.
  //
  // A room is available if it has no bookings that overlap with the requested dates.
  //
  // Hints:
  // - Use a subquery or LEFT JOIN to find rooms without overlapping bookings
  // - Example approach: SELECT rooms WHERE id NOT IN (SELECT room_id FROM bookings WHERE overlap)
  //
  getAvailableRooms(checkIn: Date, checkOut: Date): Room[] {
    // TODO: Implement this query
    return this.getAllRooms();
  }

  // TODO: Create a new booking.
  //
  // Insert a row into the bookings table and return the created Booking object.
  //
  // Hints:
  // - Use db.prepare(...).run(...) to execute an INSERT
  // - The result of .run() has a `lastInsertRowid` property for the new ID
  // - Store dates as ISO strings: date.toISOString()
  // - Set created_at to the current time: new Date().toISOString()
  // - Throw Error('Room is not available for the selected dates') if not available
  // - Use this.isRoomAvailable() to check before inserting
  //
  createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    // TODO: Implement this method
    throw new Error('Not implemented');
  }
}
