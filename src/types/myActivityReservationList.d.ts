export interface IMyActivity {
  id: number;
  bannerImageUrl: string;
  title: string;
}

export interface IMyReservation {
  id: number;
  teamId: string;
  userId: number;
  activity?: IMyActivity;
  activityId: number;
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

export interface ReservationDatas {
  activity: any;
  cusorId?: number;
  reservation: IMyReservation[];
  totalCount: number;
}

export interface PatchReservation extends IMyReservation {
  activityId: number;
}

export interface PostReservations {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}
