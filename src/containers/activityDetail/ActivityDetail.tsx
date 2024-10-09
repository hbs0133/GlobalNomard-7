import axiosInstance from '@/services/axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import MenuDropDown from '@/components/Dropdown/MenuDropdown';
import Image from 'next/image';
import { IconLocation, IconStarOn } from '@/assets/icons';
import KakaoMap from './kakaoMap';
import ReviewCard from './ReviewCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HeaderFooterLayout from '@/components/Layout/HeaderFooterLayout';

const fectchActivitys = async (id: any) => {
  const response = await axiosInstance.get(`/activities/${id}`);
  return response.data;
};

const deleteActivity = async (id: any) => {
  const response = await axiosInstance.delete(`/my-activities/${id}`);
  return response.data;
};

const fetchReviews = async (id: any, page: number = 1, size: number = 3) => {
  const response = await axiosInstance.get(
    `/activities/${id}/reviews?page=${page}&size=${size}`,
  );
  return response.data;
};

function ActivityDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => fectchActivitys(id),
    enabled: !!id,
  });

  const { data: reviewData, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviews(id),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteActivity(id),
    onSuccess: () => {
      alert('성공');
    },
    onError: () => {
      alert('실패');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleEdit = () => {
    router.push(`/regiser`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const getSatisfactionText = (rating: number) => {
    if (rating === 0) {
      return '평점 없음';
    } else if (rating > 0 && rating <= 1) {
      return '매우불만';
    } else if (rating > 1 && rating <= 2) {
      return '불만';
    } else if (rating > 2 && rating <= 3) {
      return '보통';
    } else if (rating > 3 && rating <= 4) {
      return '만족';
    } else if (rating > 4 && rating <= 5) {
      return '매우만족';
    }
    return '평점 없음';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  return (
    <HeaderFooterLayout>
      <div className="w-full bg-gray-fa">
        <div className="flex w-full justify-center">
          {data && reviewData && (
            <div className="mb-[200px] mt-[78px] flex w-[1200px] flex-col">
              <div className="border-b-[1px] border-black-nomad pb-[85px]">
                <span className="mb-[10px] text-md font-regular text-black-nomad">
                  {data.category}
                </span>
                <h1 className="flex justify-between">
                  <span className="text-3xl font-bold text-black-nomad">
                    {data.title}
                  </span>
                  <MenuDropDown onDelete={handleDelete} onEdit={handleEdit} />
                </h1>
                <div className="mt-[16px] flex items-center">
                  <div className="mr-[4px] flex">
                    <Image
                      src={IconStarOn}
                      alt="별점을 나타내는 별모양 아이콘"
                      width={16}
                      height={16}
                    />
                    <span className="ml-[4px] text-md font-regular text-black">
                      {data.rating} ({data.reviewCount})
                    </span>
                  </div>
                  <div className="flex text-md font-regular text-black-nomad">
                    <Image
                      src={IconLocation}
                      alt="주소를 나타내는 아이콘"
                      width={18}
                      height={18}
                      className="mr-[4px]"
                    />
                    {data.address}
                  </div>
                </div>
                <div className="mt-[25px] h-[534px] w-[1198px] pb-[34px]">
                  <Slider {...settings}>
                    <div>
                      <Image
                        src={data.bannerImageUrl}
                        alt="배너 이미지"
                        width={1198}
                        height={534}
                        className="h-[534px] cursor-pointer object-cover"
                      />
                    </div>

                    {data.subImages.map((image: any) => (
                      <div key={image.id}>
                        <Image
                          src={image.imageUrl}
                          alt="서브 이미지"
                          width={1198}
                          height={534}
                          className="h-[534px] cursor-pointer object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>

              <div className="mt-[40px] w-[800px] border-b-[1px] border-black-nomad pb-[34px]">
                <h1 className="text-xl font-bold text-black-nomad">체험설명</h1>
                <p className="mt-[16px] text-lg font-regular text-black-nomad">
                  {data.description}
                </p>
              </div>

              <div className="mt-[40px] w-[800px] border-b-[1px] border-black-nomad pb-[40px]">
                <KakaoMap address={data.address} />
                <div className="mt-[8px] flex text-md font-regular text-black-nomad">
                  <Image
                    src={IconLocation}
                    alt="주소를 나타내는 아이콘"
                    width={18}
                    height={18}
                    className="mr-[4px]"
                  />
                  {data.address}
                </div>
              </div>

              <div className="mt-[40px]">
                <h2 className="text-2lg font-bold text-black-nomad">후기</h2>
                <div className="mt-[24px] flex items-center gap-[16px]">
                  <span className="text-[50px] font-bold">
                    {reviewData.averageRating}
                  </span>
                  <div>
                    <span className="mb-[8px] text-2lg font-regular">
                      {getSatisfactionText(reviewData.averageRating)}
                    </span>
                    <span className="flex items-center text-md font-regular">
                      <Image
                        src={IconStarOn}
                        alt="총후기 갯수를 나타내는 별모양 아이콘"
                        width={16}
                        height={16}
                        className="mr-[6px]"
                      />
                      {reviewData.totalCount}개 후기
                    </span>
                  </div>
                </div>
                <div>
                  {reviewData.reviews.map((review: any) => (
                    <ReviewCard review={review} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </HeaderFooterLayout>
  );
}

export default ActivityDetail;
