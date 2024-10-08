'use client';

import DropDown from '@/components/Dropdown/Dropdown';
import ReservationCard from '@/components/myreservations';
import { ActivitiesData, IActivity } from '@/types/activity';
import getMyActivities from '@/services/getMyActivites';
import Button from '@/components/Button/Button';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MyActivities() {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ActivitiesData>({
    queryKey: ['myActivities'],
    queryFn: async ({ pageParam }) => {
      const result = await getMyActivities({
        cursorId: pageParam as number | undefined,
        size: 5,
      });
      return result;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.activities.length === 5) {
        return lastPage.activities[lastPage.activities.length - 1].id;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const activities = data?.pages.flatMap((page) => page.activities) || [];

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">
          내 체험 관리
        </h1>
        <Link href="/myactivities/activity-registration">
          <Button
            className="flex h-[48px] w-[120px] items-center justify-center whitespace-nowrap p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
            size={'small'}
          >
            체험 등록하기
          </Button>
        </Link>
      </div>
      <div className="space-y-2 md:space-y-4 xl:space-y-6">
        {activities.length === 0 ? (
          <div>No activities found.</div>
        ) : (
          activities.map((activity: IActivity) => (
            <ReservationCard
              key={activity.id}
              reservations={[activity]}
              getImageUrl={(activity: IActivity) =>
                activity.bannerImageUrl || ''
              }
              getTitle={(activity: IActivity) => activity.title}
              maxTitleLength={18}
              getRating={(activity: IActivity) => activity.rating}
              getReviewCount={(activity: IActivity) => activity.reviewCount}
              getPrice={(activity: IActivity) => activity.price}
            >
              <DropDown activityId={activity.id} />
            </ReservationCard>
          ))
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-4 text-center">
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </div>
      )}
    </div>
  );
}
