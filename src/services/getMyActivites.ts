'use server';

import { ActivitiesData } from '@/types/activity';

const getMyActivities = async (options?: {
  cursorId?: number;
  size?: number;
}) => {
  const query = new URLSearchParams();
  if (options?.cursorId) query.append('cursorId', String(options.cursorId));
  if (options?.size) query.append('size', String(options.size));

  try {
    const response = await fetch(`/my-activities?${query.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch activities data');
    }

    const data: ActivitiesData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'activities data failed');
    } else {
      throw new Error('activities data failed');
    }
  }
};

export default getMyActivities;
