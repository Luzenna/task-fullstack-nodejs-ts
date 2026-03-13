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

  // TODO: Get all bookings for a room
  //
  // Hints:
  // - Your query depends on the columns you added to the bookings table
  // - Map each row to a Booking using mapBooking()
  //
  getBookingsForRoom(roomId: number): Booking[] {
    // TODO: Implement this query
    return [];
  }

  // TODO: Get bookings for a room that overlap with a given date range.
  //
  // Hints:
  // - A booking overlaps if its start is before the range end AND its end is after the range start
  // - ISO 8601 strings sort lexicographically, so < and > work directly in SQL
  // - Convert Date params to ISO strings with .toISOString()
  //
  getBookingsForRoomInRange(roomId: number, from: Date, to: Date): Booking[] {
    // TODO: Implement this query
    return [];
  }

  // TODO: Check if a room is available for a given date range.
  //
  // Hints:
  // - A room is available if NO existing bookings overlap with the requested dates
  // - You can use a COUNT query or check if any rows exist
  //
  isRoomAvailable(roomId: number, checkIn: Date, checkOut: Date): boolean {
    // TODO: Implement this query
    return true;
  }

  // TODO: Get all rooms that are available for a given date range.
  //
  // Hints:
  // - Use a subquery or LEFT JOIN to find rooms without overlapping bookings
  //
  getAvailableRooms(checkIn: Date, checkOut: Date): Room[] {
    // TODO: Implement this query
    return this.getAllRooms();
  }

  // TODO: Create a new booking and return the created Booking object.
  //
  // Hints:
  // - Use db.prepare(...).run(...) to execute an INSERT
  // - The result of .run() has a `lastInsertRowid` property for the new ID
  // - Throw Error('Room is not available for the selected dates') if not available
  // - Check availability before inserting
  //
  createBooking(booking: Omit<Booking, 'id'>): Booking {
    // TODO: Implement this method
    throw new Error('Not implemented');
  }
}
