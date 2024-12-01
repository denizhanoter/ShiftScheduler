import React from 'react';
import { Employee, DateRange } from '../types/types';
import { Calendar } from 'lucide-react';
import { getDaysInRange, formatDate } from '../utils/dateUtils';
import { ShiftCell } from './ShiftCell';

interface Props {
  employees: Employee[];
  dateRange: DateRange;
}

export const ShiftSchedule: React.FC<Props> = ({ employees, dateRange }) => {
  const days = getDaysInRange(dateRange);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold">Vardiya Programı</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Personel
              </th>
              {days.map((day) => (
                <th
                  key={day.toISOString()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatDate(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {employee.name}
                </td>
                {days.map((day) => (
                  <ShiftCell
                    key={day.toISOString()}
                    employee={employee}
                    date={day}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};