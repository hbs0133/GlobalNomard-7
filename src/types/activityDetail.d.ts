export interface ISubImage {
  id: number;
  imageUrl: string;
}

export interface IActivityDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: ISubImage[];
  schedules: ISchedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
