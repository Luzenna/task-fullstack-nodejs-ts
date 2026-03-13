import { Router } from 'express';
import type { Request, Response } from 'express';
import type { IBookingRepository } from '../repositories/booking.repository.js';

export function createBookingsRouter(repository: IBookingRepository): Router {
  const router = Router();

  // TODO: POST /api/bookings
  //
  // Create a new booking.
  //
  // On success: Return 201 Created with the BookingDto
  // If room not available: Return 409 Conflict
  // If validation fails: Return 400 Bad Request
  //
  // Hints:
  // - Look at the frontend API client (frontend/src/api/client.ts) to understand the expected request/response shape
  // - Complete the CreateBookingRequest and BookingDto interfaces to match
  // - The repository throws Error('Room is not available...') if room is not available
  // - Use try/catch to handle the repository error
  //
  router.post('/', (req: Request, res: Response) => {
    // TODO: Implement this endpoint
    res.status(501).json({ message: 'Not implemented' });
  });

  return router;
}
