import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import starIcon from '@/assets/icons/ic_like_star.svg';
import nextBtn from '@/assets/icons/ic_arrow_right_black_48px.svg';
import prevBtn from '@/assets/icons/ic_arrow_left_black_48px.svg';
import 'swiper/css';
import Image from 'next/image';

function MostReview({ fetchActivities }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['most-reviews'],
    queryFn: () => fetchActivities('offset', '', ''),
    staleTime: 60000,
  });

  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="mt-[93px] flex sm:mt-[142px] 2xl:mt-[158px]">
      <div className="mx-auto w-[100%] max-w-[1200px] pl-4 sm:pl-8 xl:pl-0">
        <div className="mb-4 flex justify-between sm:mb-8">
          <p className="flex items-center text-2lg font-bold sm:text-3xl">
            🔥 인기 체험
          </p>
          <div className="hidden lg:flex">
            <div className="swiper-button-prev">
              <Image src={prevBtn} alt="이전버튼" />
            </div>
            <div className="swiper-button-next">
              <Image src={nextBtn} alt="다음버튼" />
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="relative"
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 100,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {data?.activities.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="swiper-slide-content relative">
                <div className="relative h-[186px] w-[186px] sm:h-[384px] sm:w-[384px]">
                  <Image
                    src={item.bannerImageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[24px]"
                  />
                  <div
                    className="absolute inset-0 rounded-[24px]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 33.33%, rgba(0, 0, 0, 0.8) 91.67%)',
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end px-5 py-6 text-white sm:py-[30px]">
                    <div className="mb-[6px] flex items-center sm:mb-[20px]">
                      <Image
                        src={starIcon}
                        alt="별 아이콘"
                        width={16}
                        height={16}
                      />
                      <p className="ml-1 text-md font-semibold">
                        {item.rating}
                      </p>
                      <p className="ml-1 text-md font-semibold">
                        ({item.reviewCount})
                      </p>
                    </div>
                    <p className="mb-[6px] h-[52px] w-[146px] text-2lg font-bold sm:mb-5 sm:h-[84px] sm:w-[251px] sm:text-3xl">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-[5px]">
                      <p className="text-lg font-bold sm:text-xl">
                        ₩ {item.price}
                      </p>
                      <p className="text-md text-gray-a1">/ 인</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MostReview;
