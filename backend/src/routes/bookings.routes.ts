import { Router } from 'express';
import type { Request, Response } from 'express';
import type { IBookingRepository } from '../repositories/booking.repository.js';

export function createBookingsRouter(repository: IBookingRepository): Router {
  const router = Router();

  // TODO: POST /api/bookings
  //
  // Create a new booking. Request body is CreateBookingRequest:
  //   { roomId, customerName, customerEmail, checkIn, checkOut }
  //
  // On success: Return 201 Created with the BookingDto
  // If room not available: Return 409 Conflict
  // If validation fails: Return 400 Bad Request
  //
  // Consider:
  //   - What makes a valid booking request? (required fields, valid dates, room exists)
  //   - The repository throws Error('Room is not available...') if room is not available
  //   - What should the response body contain for errors?
  //
  // Hints:
  // - The request body shape matches CreateBookingRequest (see dtos/create-booking.dto.ts)
  // - Parse date strings to Date objects for the repository
  // - Use try/catch to handle the repository error for unavailable rooms
  // - Map the returned Booking to BookingDto (dates as ISO strings)
  // - Return res.status(201).json(bookingDto)
  //
  router.post('/', (req: Request, res: Response) => {
    // TODO: Implement this endpoint
    res.status(501).json({ message: 'Not implemented' });
  });

  return router;
}
