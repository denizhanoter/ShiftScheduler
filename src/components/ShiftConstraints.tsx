import React from 'react';
import { ShiftType } from '../types/types';
import { Clock } from 'lucide-react';

interface Props {
  selectedShifts: ShiftType[];
  onChange: (shifts: ShiftType[]) => void;
}

export const ShiftConstraints: React.FC<Props> = ({ selectedShifts, onChange }) => {
  const toggleShift = (shift: ShiftType) => {
    if (selectedShifts.includes(shift)) {
      onChange(selectedShifts.filter(s => s !== shift));
    } else {
      onChange([...selectedShifts, shift]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Çalışabildiği Vardiyalar
      </label>
      <div className="flex flex-wrap gap-2">
        {(['morning', 'evening', 'night'] as ShiftType[]).map((shift) => (
          <button
            key={shift}
            type="button"
            onClick={() => toggleShift(shift)}
            className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md
              ${selectedShifts.includes(shift)
                ? 'bg-indigo-600 text-white border-transparent'
                : 'bg-white text-gray-700 border-gray-300'
              } hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <Clock className="h-4 w-4 mr-2" />
            {shift === 'morning' ? 'Sabah' : shift === 'evening' ? 'Akşam' : 'Gece'}
          </button>
        ))}
      </div>
    </div>
  );
};