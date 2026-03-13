export interface DateConflict {
  checkIn: string;
  checkOut: string;
}

export interface AvailabilityResponse {
  available: boolean;
  conflicts?: DateConflict[];
}
