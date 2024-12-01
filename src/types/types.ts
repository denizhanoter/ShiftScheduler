export type ShiftType = 'morning' | 'evening' | 'night';

export interface ShiftAssignment {
  date: Date;
  shift: ShiftType | 'off';
}

export interface Employee {
  id: string;
  name: string;
  constraints: EmployeeConstraint[];
  assignments: ShiftAssignment[];
  leaveHistory: Leave[];
  leaveRequests: LeaveRequest[];
  isActive: boolean;
}

export interface EmployeeConstraint {
  type: 'SHIFT_RESTRICTION' | 'DATE_RESTRICTION';
  allowedShifts: ShiftType[];
  startDate?: Date;
  endDate?: Date;
  description: string;
}

export interface Leave {
  startDate: Date;
  endDate: Date;
  type: 'ANNUAL' | 'SHIFT_CHANGE' | 'WEEKLY';
}

export interface LeaveRequest {
  date: Date;
  type: 'OPTIONAL';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ShiftDistribution {
  morning: number;
  evening: number;
  night: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}