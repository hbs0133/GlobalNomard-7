export interface IAvailableTime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface IAvailableDate {
  date: string;
  times: IAvailableTime[];
}

export type ActivityAvailability = IAvailableDate[];
