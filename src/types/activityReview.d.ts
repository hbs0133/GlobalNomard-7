export interface IUser {
  id: number;
  profileImageUrl: string;
  nickname: string;
}

export interface IReview {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: IReview[];
}
