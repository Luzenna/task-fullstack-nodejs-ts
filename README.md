# Hotel Booking - Fullstack Technical Exercise

A partially implemented hotel booking system. Your task is to complete the missing pieces in both the backend and frontend.

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

- API runs at http://localhost:5000
- SQLite database (`booking.db`) is created automatically on first run

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at http://localhost:5173

## Your Task

### Backend (Node.js + Express + TypeScript + SQLite)

In `src/database/init.ts`:
- ❌ Complete the `bookings` table schema (add missing columns)

In `src/repositories/sqlite-booking.repository.ts`:
- ❌ Implement `getBookingsForRoomInRange()` - SQL query with date overlap
- ❌ Implement `isRoomAvailable()` - SQL query checking availability
- ❌ Implement `getAvailableRooms()` - SQL query for available rooms
- ❌ Implement `createBooking()` - INSERT with validation

In `src/routes/rooms.routes.ts`:
- ❌ `GET /api/rooms` - TODO (add optional `isAvailable` filtering)
- ✅ `GET /api/rooms/:id` - Done
- ❌ `GET /api/rooms/:id/availability` - TODO

In `src/routes/bookings.routes.ts`:
- ❌ `POST /api/bookings` - TODO

### Frontend (React + TypeScript)

- ❌ `components/RoomList.tsx` - Implement loading, error, empty, and list states
- ❌ `components/BookingForm.tsx` - Implement the submit handler
- ❌ `App.tsx` - Implement handleBookingSuccess

## Time

~60-90 minutes for both backend and frontend.

## What's Already Provided

### Backend
- SQLite database setup with `better-sqlite3` (rooms table created and seeded)
- TypeScript interfaces and DTOs
- Repository interface and partial SQLite implementation (room queries done)
- Express app setup with CORS and static file serving
- Error handling middleware
- One working endpoint as reference (`GET /api/rooms/:id`)
- Row-to-model mapping helpers in the repository

### Frontend
- API client functions in `src/api/client.ts`
- TypeScript types in `src/types/index.ts`
- Custom hooks for data fetching
- UI components (RoomCard, DateRangePicker)
- TailwindCSS styling

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/rooms | Get all rooms |
| GET | /api/rooms?isAvailable=true&checkIn=...&checkOut=... | Get available rooms for date range |
| GET | /api/rooms/:id | Get room by ID |
| GET | /api/rooms/:id/availability?checkIn=...&checkOut=... | Check room availability |
| POST | /api/bookings | Create a booking |
