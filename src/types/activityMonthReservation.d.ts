export interface IReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface IMonthlyActivity {
  date: string;
  reservations: IReservationStatus;
}

export type MonthlyActivityList = IMonthlyActivity[];
