import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { InMemoryBookingRepository } from './repositories/in-memory-booking.repository.js';
import { createRoomsRouter } from './routes/rooms.routes.js';
import { createBookingsRouter } from './routes/bookings.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001'] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Repository (singleton — same instance shared across all routes)
const repository = new InMemoryBookingRepository();

// Routes
app.use('/api/rooms', createRoomsRouter(repository));
app.use('/api/bookings', createBookingsRouter(repository));

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Booking API running at http://localhost:${port}`);
});
