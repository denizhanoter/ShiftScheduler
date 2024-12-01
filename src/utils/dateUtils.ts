import { DateRange } from '../types/types';

export const getDaysInRange = (dateRange: DateRange): Date[] => {
  const days: Date[] = [];
  let currentDate = new Date(dateRange.startDate);

  while (currentDate <= dateRange.endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('tr-TR', { weekday: 'short', day: 'numeric' }).format(date);
};