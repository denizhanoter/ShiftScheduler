import { Employee, ShiftType, ShiftDistribution, DateRange, ShiftAssignment } from '../types/types';

export const calculateEmployeesPerShift = (
  activeEmployees: number,
  distribution: ShiftDistribution
): Record<ShiftType, number> => {
  const total = distribution.morning + distribution.evening + distribution.night;
  
  return {
    morning: Math.round((distribution.morning / total) * activeEmployees),
    evening: Math.round((distribution.evening / total) * activeEmployees),
    night: Math.round((distribution.night / total) * activeEmployees),
  };
};

export const canWorkInShift = (
  employee: Employee,
  shift: ShiftType,
  date: Date,
  existingAssignments: ShiftAssignment[]
): boolean => {
  // Check if employee is active
  if (!employee.isActive) return false;

  // Check shift constraints
  const shiftConstraint = employee.constraints.find(c => c.type === 'SHIFT_RESTRICTION');
  if (shiftConstraint && !shiftConstraint.allowedShifts.includes(shift)) {
    return false;
  }

  // Check date restrictions
  const dateConstraints = employee.constraints.filter(c => 
    c.type === 'DATE_RESTRICTION' && 
    c.startDate && c.endDate && 
    date >= c.startDate && 
    date <= c.endDate
  );
  if (dateConstraints.length > 0) {
    return false;
  }

  // Check leave requests
  const hasLeaveRequest = employee.leaveRequests.some(
    leave => leave.date.toDateString() === date.toDateString() && leave.status === 'APPROVED'
  );
  if (hasLeaveRequest) {
    return false;
  }

  // Check if already worked 6 days in the week
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const weeklyAssignments = existingAssignments.filter(a => 
    a.date >= weekStart && 
    a.date <= weekEnd && 
    a.shift !== 'off'
  );

  if (weeklyAssignments.length >= 6) {
    return false;
  }

  return true;
};

export const generateShiftSchedule = (
  employees: Employee[],
  distribution: ShiftDistribution,
  dateRange: DateRange
): Employee[] => {
  const updatedEmployees = employees.map(emp => ({
    ...emp,
    assignments: []
  }));

  const days = getDaysInRange(dateRange);
  const activeEmployees = employees.filter(emp => emp.isActive);
  const shiftsPerDay = calculateEmployeesPerShift(activeEmployees.length, distribution);

  // First, assign weekly off days
  days.forEach(date => {
    updatedEmployees.forEach(emp => {
      if (shouldAssignOffDay(emp, date)) {
        emp.assignments.push({ date: new Date(date), shift: 'off' });
      }
    });
  });

  // Then, assign shifts for each day
  days.forEach(date => {
    Object.entries(shiftsPerDay).forEach(([shift, count]) => {
      const shiftType = shift as ShiftType;
      const eligibleEmployees = updatedEmployees.filter(emp => 
        canWorkInShift(emp, shiftType, date, emp.assignments) &&
        !emp.assignments.some(a => a.date.toDateString() === date.toDateString())
      );

      // Sort by least assigned shifts to ensure fair distribution
      eligibleEmployees.sort((a, b) => 
        a.assignments.filter(as => as.shift === shiftType).length -
        b.assignments.filter(as => as.shift === shiftType).length
      );

      for (let i = 0; i < Math.min(count, eligibleEmployees.length); i++) {
        const employee = eligibleEmployees[i];
        employee.assignments.push({
          date: new Date(date),
          shift: shiftType
        });
      }
    });
  });

  return updatedEmployees;
};

const shouldAssignOffDay = (employee: Employee, date: Date): boolean => {
  // Check if there's a specific leave request
  const hasLeaveRequest = employee.leaveRequests.some(
    req => req.date.toDateString() === date.toDateString() && req.status === 'APPROVED'
  );
  if (hasLeaveRequest) return true;

  // If no specific request, check if we need to assign a weekly off day
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  
  const existingOffDay = employee.assignments.some(a => 
    a.shift === 'off' &&
    a.date >= weekStart &&
    a.date.setDate(weekStart.getDate() + 6)
  );

  return !existingOffDay;
};

const getDaysInRange = (dateRange: DateRange): Date[] => {
  const days: Date[] = [];
  let currentDate = new Date(dateRange.startDate);

  while (currentDate <= dateRange.endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};