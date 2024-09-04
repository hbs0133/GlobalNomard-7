export interface IReservationCount {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface IDailySchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: IReservationCount;
}

export type DailyScheduleList = IDailySchedule[];
