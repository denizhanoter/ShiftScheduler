import React from 'react';
import { Employee } from '../types/types';

interface Props {
  employee: Employee;
  date: Date;
}

export const ShiftCell: React.FC<Props> = ({ employee, date }) => {
  const getShiftForDay = () => {
    const assignment = employee.assignments?.find(
      a => a.date.toDateString() === date.toDateString()
    );
    return assignment?.shift || '-';
  };

  const shift = getShiftForDay();

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm ${
        shift === 'off'
          ? 'text-red-500 font-medium'
          : 'text-gray-500'
      }`}
    >
      {shift}
    </td>
  );
};