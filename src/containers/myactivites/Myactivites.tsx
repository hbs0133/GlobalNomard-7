'use client';

import MenuDropDown from '@/components/Dropdown/MenuDropdown';
import ReservationCard from '@/components/myreservations';
import { ActivitiesData, IActivity } from '@/types/activity';
import getMyActivities from './components/getMyActivities';
import Button from '@/components/Button/Button';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function MyActivities() {
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
        <Link href="/myactivities/register">
          <Button size={'small'}>체험 등록하기</Button>
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
              getRating={(activity: IActivity) => activity.rating}
              getReviewCount={(activity: IActivity) => activity.reviewCount}
              getPrice={(activity: IActivity) => activity.price}
            ></ReservationCard>
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

export default MyActivities;
