import { ReservationDatas } from '@/types/myActivityReservationList';

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
): Promise<ReservationDatas> => {
  try {
    const query = new URLSearchParams();

    if (options?.cursorId !== undefined && options.cursorId !== 1) {
      query.append('cursorId', String(options.cursorId));
    }
    if (options?.size !== undefined) {
      query.append('size', String(options.size));
    }
    if (options?.status !== undefined) {
      query.append('status', options.status);
    }

    const response = await fetch(`/my-reservations?${query.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations data');
    }

    const data: ReservationDatas = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'reservation failed');
    } else {
      throw new Error('reservation failed');
    }
  }
};

export default getMyReservations;
