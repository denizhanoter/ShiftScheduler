import React from 'react';
import { Employee } from '../types/types';
import { Trash2, Calendar } from 'lucide-react';
import { LeaveRequestForm } from './LeaveRequestForm';

interface Props {
  employees: Employee[];
  onRemove: (id: string) => void;
  onLeaveRequest: (id: string, date: Date) => void;
}

export const EmployeeList: React.FC<Props> = ({ employees, onRemove, onLeaveRequest }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Personel Listesi</h3>
      <div className="space-y-4">
        {employees.filter(emp => emp.isActive).map(employee => (
          <div key={employee.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{employee.name}</span>
              <button
                onClick={() => onRemove(employee.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <LeaveRequestForm onSubmit={(date) => onLeaveRequest(employee.id, date)} />
          </div>
        ))}
      </div>
    </div>
  );
};