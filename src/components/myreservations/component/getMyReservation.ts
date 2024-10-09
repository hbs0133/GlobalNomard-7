import { ReservationsData } from '@/types/activityReservation';
import axiosInstance from '@/services/axios'; // axios 인스턴스를 불러옵니다.

type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

interface getMyReservationsOptions {
  size?: number;
  cursorId?: number;
  status?: ReservationStatus;
}

const getMyReservations = async (
  options: getMyReservationsOptions,
): Promise<ReservationsData> => {
  try {
    const params: Record<string, string | number> = {};

    if (options?.cursorId !== undefined && options.cursorId !== 1) {
      params.cursorId = options.cursorId;
    }
    if (options?.size !== undefined) {
      params.size = options.size;
    }
    if (options?.status !== undefined) {
      params.status = options.status;
    }

    // axios 인스턴스를 사용하여 GET 요청 보내기
    const response = await axiosInstance.get<ReservationsData>(
      'my-reservations',
      {
        params,
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'reservation failed');
    } else {
      throw new Error('reservation failed');
    }
  }
};

export default getMyReservations;
