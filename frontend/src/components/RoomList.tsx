import { Room } from '../types';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
}

export function RoomList({ rooms, loading, error, selectedRoom, onSelectRoom }: RoomListProps) {
  // TODO: Implement this component
  //
  // Requirements:
  // - Show a loading state when loading is true
  // - Show an error message when error is not null
  // - Show a message when rooms array is empty (no available rooms)
  // - Render a RoomCard for each room
  // - Pass the correct props to RoomCard (room, onSelect, selected)
  //
  // Hints:
  // - Use the RoomCard component that's already imported
  // - A room is selected if selectedRoom?.id === room.id

  return (
    <div>
      {/* TODO: Implement loading, error, empty, and list states */}
      <p>Room list goes here...</p>
    </div>
  );
}
