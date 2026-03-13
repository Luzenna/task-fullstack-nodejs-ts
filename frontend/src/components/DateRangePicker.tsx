interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => onCheckInChange(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(e) => onCheckOutChange(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
    </div>
  );
}
