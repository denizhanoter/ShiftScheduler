import React from 'react';
import { DateRange } from '../types/types';
import { Calendar } from 'lucide-react';

interface Props {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangePicker: React.FC<Props> = ({ dateRange, onChange }) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Vardiya Tarih Aralığı
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            value={dateRange.startDate.toISOString().split('T')[0]}
            onChange={(e) => onChange({
              ...dateRange,
              startDate: new Date(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bitiş Tarihi
          </label>
          <input
            type="date"
            value={dateRange.endDate.toISOString().split('T')[0]}
            onChange={(e) => onChange({
              ...dateRange,
              endDate: new Date(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};