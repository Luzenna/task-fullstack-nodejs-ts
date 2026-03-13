import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  selected?: boolean;
}

export function RoomCard({ room, onSelect, selected }: RoomCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect?.(room)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{room.name}</h3>
          <p className="text-gray-600 text-sm">{room.category}</p>
        </div>
        <span className="text-lg font-bold text-green-600">
          ${room.pricePerNight}/night
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Capacity: {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}
      </div>
    </div>
  );
}
