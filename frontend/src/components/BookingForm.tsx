import { useState } from 'react';
import { Room } from '../types';

interface BookingFormProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BookingForm({ room, checkIn, checkOut, onSuccess, onCancel }: BookingFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement the submit logic
    //
    // Requirements:
    // - Validate that customerName and customerEmail are not empty
    // - Set submitting to true while the request is in progress
    // - Call createBooking with the correct request body
    // - On success, call onSuccess()
    // - On error, set the error state with the error message
    // - Set submitting to false when done (success or error)
    //
    // Hints:
    // - The createBooking function is already imported
    // - Use try/catch to handle errors
    // - The request body should be: { roomId, customerName, customerEmail, checkIn, checkOut }

    console.log('TODO: Implement submit');
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold text-lg mb-4">Complete Your Booking</h3>

      <div className="mb-4 p-3 bg-white rounded border">
        <p className="font-medium">{room.name}</p>
        <p className="text-sm text-gray-600">
          {checkIn} to {checkOut} · ${room.pricePerNight}/night
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="john@example.com"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
