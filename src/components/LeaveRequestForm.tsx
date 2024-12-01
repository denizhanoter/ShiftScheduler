import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  onSubmit: (date: Date) => void;
}

export const LeaveRequestForm: React.FC<Props> = ({ onSubmit }) => {
  const [date, setDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onSubmit(new Date(date));
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Calendar className="h-4 w-4 mr-2" />
          İzin Talep Et
        </button>
      </div>
    </form>
  );
};