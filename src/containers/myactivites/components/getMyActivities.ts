import { ActivitiesData } from '@/types/activity';
import axiosInstance from '@/services/axios'; // axios 인스턴스를 불러옵니다.

const getMyActivities = async (options?: {
  cursorId?: number;
  size?: number;
}) => {
  try {
    // axios 인스턴스를 사용하여 GET 요청 보내기
    const response = await axiosInstance.get<ActivitiesData>('my-activities', {
      params: options, // 쿼리 파라미터를 전달
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'activities data failed');
    } else {
      throw new Error('activities data failed');
    }
  }
};

export default getMyActivities;
