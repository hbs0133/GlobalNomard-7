import axiosInstance from '@/services/axios';

export interface FetchActivitiesParams {
  method: 'offset' | 'cursor';
  category?: string;
  sort?: string;
  page?: string;
  size?: string;
  cursorId?: number;
  keyword?: string;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

const fetchActivities = async ({
  method = 'offset',
  category,
  sort,
  page = '1',
  size = '20',
  cursorId,
  keyword,
}: FetchActivitiesParams): Promise<FetchActivitiesResponse> => {
  const params: Record<string, string | number | undefined> = {
    method,
    page,
    size,
  };

  if (category) {
    params.category = category;
  }
  if (sort) {
    params.sort = sort;
  }
  if (keyword) {
    params.keyword = keyword;
  }
  if (method === 'cursor' && cursorId !== undefined) {
    params.cursorId = cursorId;
  }

  const res = await axiosInstance.get<FetchActivitiesResponse>('/activities', {
    params,
  });
  return res.data;
};

export default fetchActivities;
