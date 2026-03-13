import { Router } from 'express';
import type { Request, Response } from 'express';
import type { IBookingRepository } from '../repositories/booking.repository.js';
import type { RoomDto } from '../dtos/room.dto.js';

export function createRoomsRouter(repository: IBookingRepository): Router {
  const router = Router();

  // TODO: GET /api/rooms
  // TODO: GET /api/rooms?isAvailable=true&checkIn=2026-03-01&checkOut=2026-03-05
  //
  // Return all rooms, optionally filtered by availability.
  //
  // When isAvailable=true is provided with checkIn and checkOut:
  //   - Return only rooms available for that date range
  //   - Validate that checkOut is after checkIn
  //
  // When no query params (or isAvailable is not true):
  //   - Return all rooms
  //
  router.get('/', (req: Request, res: Response) => {
    // TODO: Implement filtering logic
    //
    // Hints:
    // - Query params are strings: req.query.isAvailable, req.query.checkIn, req.query.checkOut
    // - Use repository.getAvailableRooms() for filtered results
    // - Use repository.getAllRooms() for unfiltered results
    // - Return 400 Bad Request if isAvailable=true but dates are missing/invalid
    // - Parse date strings to Date objects for the repository

    const rooms = repository.getAllRooms();
    const roomDtos: RoomDto[] = rooms.map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      pricePerNight: r.pricePerNight,
      capacity: r.capacity,
      imageUrl: r.imageUrl,
    }));
    res.json(roomDtos);
  });

  // DONE: GET /api/rooms/:id
  router.get('/:id', (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'Invalid room ID' });
      return;
    }

    const room = repository.getRoomById(id);
    if (room == null) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    const roomDto: RoomDto = {
      id: room.id,
      name: room.name,
      category: room.category,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      imageUrl: room.imageUrl,
    };
    res.json(roomDto);
  });

  // TODO: GET /api/rooms/:id/availability?checkIn=2026-03-01&checkOut=2026-03-05
  //
  // Check if a specific room is available for the given date range.
  // Return an AvailabilityResponse with:
  //   - available: true/false
  //   - If not available, include the conflicting booking dates in conflicts
  //
  // Consider:
  //   - What if the room doesn't exist? (404)
  //   - What if checkOut is before or equal to checkIn? (400)
  //   - What if dates are missing? (400)
  //
  // Hints:
  // - Parse query params: req.query.checkIn, req.query.checkOut (they are strings)
  // - Use repository.isRoomAvailable() to check availability
  // - Use repository.getBookingsForRoomInRange() to get conflicting bookings
  // - Format dates as ISO strings (toISOString()) for the response
  //
  router.get('/:id/availability', (req: Request, res: Response) => {
    // TODO: Implement this endpoint
    res.status(501).json({ message: 'Not implemented' });
  });

  return router;
}
