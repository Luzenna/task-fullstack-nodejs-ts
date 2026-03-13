import { useState } from 'react';
import { Room } from './types';
import { useAvailableRooms } from './hooks/useRooms';
import { DateRangePicker } from './components/DateRangePicker';
import { RoomList } from './components/RoomList';
import { BookingForm } from './components/BookingForm';

function App() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // This hook fetches available rooms when checkIn and checkOut are set
  const { rooms, loading, error, refetch } = useAvailableRooms(
    checkIn || null,
    checkOut || null
  );

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBookRoom = () => {
    if (selectedRoom) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSuccess = () => {
    // TODO: Implement what happens after a successful booking
    //
    // Consider:
    // - Clear the selected room
    // - Hide the booking form
    // - Show a success message (you can use alert() for simplicity)
    // - Refetch the available rooms

    console.log('TODO: Handle booking success');
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Hotel Booking</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Date Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Your Dates</h2>
          <DateRangePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />
        </section>

        {/* Room List - only show when dates are selected */}
        {checkIn && checkOut && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Available Rooms</h2>
            <RoomList
              rooms={rooms}
              loading={loading}
              error={error}
              selectedRoom={selectedRoom}
              onSelectRoom={handleSelectRoom}
            />

            {/* Book button - only show when a room is selected and form is not shown */}
            {selectedRoom && !showBookingForm && (
              <div className="mt-4">
                <button
                  onClick={handleBookRoom}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Book {selectedRoom.name}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Booking Form */}
        {showBookingForm && selectedRoom && (
          <section>
            <BookingForm
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              onSuccess={handleBookingSuccess}
              onCancel={handleCancelBooking}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
