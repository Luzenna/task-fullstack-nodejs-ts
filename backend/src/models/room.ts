export interface Room {
  id: number;
  name: string;
  category: 'Single' | 'Double' | 'Suite';
  pricePerNight: number;
  capacity: number;
  imageUrl: string;
}
