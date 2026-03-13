import { useState, useEffect } from 'react';
import { Room } from '../types';
import { fetchRooms, fetchAvailableRooms } from '../api/client';

interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRooms(): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return { rooms, loading, error, refetch: loadRooms };
}

export function useAvailableRooms(checkIn: string | null, checkOut: string | null): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    if (!checkIn || !checkOut) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchAvailableRooms(checkIn, checkOut);
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [checkIn, checkOut]);

  return { rooms, loading, error, refetch: loadRooms };
}
