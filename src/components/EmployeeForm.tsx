import React, { useState } from 'react';
import { Employee, ShiftType } from '../types/types';
import { User } from 'lucide-react';
import { ShiftConstraints } from './ShiftConstraints';
import { LeaveRequestForm } from './LeaveRequestForm';

interface Props {
  onSubmit: (employee: Employee) => void;
}

export const EmployeeForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [selectedShifts, setSelectedShifts] = useState<ShiftType[]>(['morning', 'evening', 'night']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee: Employee = {
      id: Date.now().toString(),
      name,
      constraints: [{
        type: 'SHIFT_RESTRICTION',
        allowedShifts: selectedShifts,
        description: `Can work in: ${selectedShifts.join(', ')}`
      }],
      leaveHistory: [],
      leaveRequests: []
    };
    onSubmit(employee);
    setName('');
    setSelectedShifts(['morning', 'evening', 'night']);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Personel Adı
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Ad Soyad"
            required
          />
        </div>
      </div>

      <ShiftConstraints
        selectedShifts={selectedShifts}
        onChange={setSelectedShifts}
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Personel Ekle
      </button>
    </form>
  );
};