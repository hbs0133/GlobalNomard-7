export interface IMyActivity {
  id: number;
  bannerImageUrl: string;
  title: string;
}

export interface IMyReservation {
  id: number;
  teamId: string;
  userId: number;
  activity: IMyActivity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
