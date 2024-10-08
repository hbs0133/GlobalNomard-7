import Button from '../../Button/Button';
import { ReservationDatas } from '@/types/myActivityReservationList';
import getMyReservations from './getMyReservation';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from 'react-query';
import EmptyPage from './EmptyPage';
import { getStatusColor, getStatustext } from './StatusUtils';

const ReservationCard = () => {
  const { data, error, isLoading } = useQuery<ReservationDatas>({
    queryKey: ['reservations'],
    queryFn: () => getMyReservations({ size: 10 }),
    staleTime: 60000,
    retry: 2,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  if (!data || data.reservation.length === 0) {
    return <EmptyPage />;
  }

  //타이틀 생략 변환
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  //날짜 변환
  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, '. ');
  };

  return (
    <div className="mx-auto flex-row">
      {data.reservation.map((reservation) => (
        <div
          key={reservation.id}
          className="flex h-[128px] w-[344px] rounded-3xl border border-solid border-gray-300 bg-white md:h-[156px] md:w-[429px] xl:h-[204px] xl:w-[792px]"
        >
          <div className="relative h-[128px] w-[128px] overflow-hidden rounded-l-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]">
            {reservation.activity && (
              <Image
                src={reservation.activity.bannerImageUrl}
                priority
                layout="fill"
                objectFit="cover"
                alt="배너 이미지"
              />
            )}
          </div>
          <div className="ml-2 mt-[11px] grid md:ml-3 md:mt-[12px] xl:ml-6 xl:mt-[21px] xl:h-[162px]">
            <div className="grid gap-1 md:gap-[0px] xl:gap-[12px]">
              <div
                className={`text-sm font-bold md:text-lg ${getStatusColor(reservation.status)}`}
              >
                {getStatustext(reservation.status)}
              </div>
              <div className="text-md-bold md:text-lg-bold xl:text-xl-bold">
                {reservation.activity ? (
                  <>
                    <span className="block xl:hidden">
                      {truncateTitle(reservation.activity.title, 15)}
                    </span>
                    <span className="hidden xl:block">
                      {reservation.activity.title}
                    </span>
                  </>
                ) : (
                  <span>Activity title not available</span>
                )}
              </div>
              <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
                {formatDate(reservation.date)} · {reservation.startTime} -{' '}
                {reservation.endTime} · {reservation.headCount}명
              </div>
            </div>
            <div className="mb-1 flex w-[190px] items-center justify-between md:w-[245px] xl:mb-0 xl:mt-4 xl:w-[540px]">
              <div className="text-2lg-medium md:text-xl-medium xl:text-2xl-medium">
                ₩{reservation.totalPrice}
              </div>
              <div>
                <Button size={'small'} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationCard;
