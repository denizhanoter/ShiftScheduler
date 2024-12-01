import React, { useState } from 'react';
import { Employee, ShiftDistribution, DateRange } from './types/types';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeList } from './components/EmployeeList';
import { ShiftDistributionSlider } from './components/ShiftDistributionSlider';
import { ShiftSchedule } from './components/ShiftSchedule';
import { DateRangePicker } from './components/DateRangePicker';
import { Users, CalendarCheck } from 'lucide-react';
import { generateShiftSchedule } from './utils/shiftUtils';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [distribution, setDistribution] = useState<ShiftDistribution>({
    morning: 40,
    evening: 30,
    night: 30,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 6))
  });

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, isActive: true }]);
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, isActive: false } : emp
    ));
  };

  const handleLeaveRequest = (employeeId: string, date: Date) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId
        ? {
            ...emp,
            leaveRequests: [
              ...emp.leaveRequests,
              { date, type: 'OPTIONAL', status: 'APPROVED' }
            ]
          }
        : emp
    ));
  };

  const handleGenerateSchedule = () => {
    const updatedEmployees = generateShiftSchedule(employees, distribution, dateRange);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="h-8 w-8 mr-3 text-indigo-600" />
              Vardiya Planlama Sistemi
            </h1>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="space-y-8 md:col-span-1">
                <EmployeeForm onSubmit={handleAddEmployee} />
                <EmployeeList
                  employees={employees}
                  onRemove={handleRemoveEmployee}
                  onLeaveRequest={handleLeaveRequest}
                />
                <ShiftDistributionSlider
                  distribution={distribution}
                  onChange={setDistribution}
                />
                <DateRangePicker
                  dateRange={dateRange}
                  onChange={setDateRange}
                />
                <button
                  onClick={handleGenerateSchedule}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CalendarCheck className="h-5 w-5 mr-2" />
                  Vardiya Planla
                </button>
              </div>
              
              <div className="md:col-span-2">
                <ShiftSchedule
                  employees={employees.filter(emp => emp.isActive)}
                  dateRange={dateRange}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;