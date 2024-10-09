export interface ActivityData {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface IReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  activity?: ActivityData;
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

export interface ReservationsData {
  activity: any;
  cursorId?: number;
  reservations: ReservationsList[];
  totalCount: number;
}

export interface PatchReservations extends ReservationsList {
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
