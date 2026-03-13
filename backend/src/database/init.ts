import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function initDatabase(): Database.Database {
  const dbPath = path.join(__dirname, '..', '..', 'booking.db');
  const db = new Database(dbPath);

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Create rooms table
  db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('Single', 'Double', 'Suite')),
      price_per_night REAL NOT NULL,
      capacity INTEGER NOT NULL,
      image_url TEXT NOT NULL
    )
  `);

  // Seed rooms (INSERT OR IGNORE so it's safe to run multiple times)
  const insertRoom = db.prepare(`
    INSERT OR IGNORE INTO rooms (id, name, category, price_per_night, capacity, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const seedRooms = db.transaction(() => {
    insertRoom.run(1, 'Ocean View Suite', 'Suite', 450, 2, '/images/suite-1.svg');
    insertRoom.run(2, 'Garden Room', 'Double', 200, 2, '/images/double-1.svg');
    insertRoom.run(3, 'City Single', 'Single', 120, 1, '/images/single-1.svg');
    insertRoom.run(4, 'Family Suite', 'Suite', 550, 4, '/images/suite-2.svg');
    insertRoom.run(5, 'Budget Double', 'Double', 150, 2, '/images/double-2.svg');
    insertRoom.run(6, 'Penthouse', 'Suite', 800, 2, '/images/suite-3.svg');
  });

  seedRooms();

  // TODO: Complete the bookings table schema.
  //
  // The table below only has `id` 
  // Add the rest of the columns
  //
  // Hint: SQLite stores dates as TEXT in ISO 8601 format (e.g. '2026-03-10T00:00:00.000Z')
  //
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    )
  `);

  console.log('Database initialized');
  return db;
}
