import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import ItemCard from './ItemCard';
import DropDown from '@/components/Dropdown/Dropdown';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import fetchActivities, {
  FetchActivitiesResponse,
  Activity,
} from '@/services/fetchActivities';
import { useRouter } from 'next/router';

function Category() {
  const [categoryValue, setCategoryValue] = useState<string>('');
  // const [sortValue, setSortValue] = useState<
  //   'price_asc' | 'price_desc' | 'most_reviewed' | 'latest' | undefined
  // >(undefined);
  const [sortValue, setSortValue] = useState('');
  const [sortLabel, setSortLabel] = useState<string>('가격');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const router = useRouter();

  const sortOptions: {
    label: string;
    value: 'price_asc' | 'price_desc' | 'most_reviewed' | 'latest';
  }[] = [
    { label: '가격 낮은순', value: 'price_asc' },
    { label: '가격 높은순', value: 'price_desc' },
    { label: '가장 많이 리뷰된', value: 'most_reviewed' },
    { label: '최신순', value: 'latest' },
  ];

  const categoryOptions = [
    '문화 · 예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1275) {
        setItemsPerPage(8);
      } else if (width >= 650) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { isLoading, error, data } = useQuery<FetchActivitiesResponse>({
    queryKey: ['category', categoryValue, sortValue, currentPage, itemsPerPage],
    queryFn: () =>
      fetchActivities({
        method: 'offset',
        category: categoryValue || undefined,
        sort: sortValue,
        page: currentPage.toString(),
        size: itemsPerPage.toString(),
      }),
    staleTime: 60000,
  });

  const handleCategoryClick = (category: string) => {
    setCategoryValue((prev) => (prev === category ? '' : category));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
    }
  }, [data]);

  const handleClickCard = (id: number) => {
    router.push(`/activityDetail/${id}`);
  };

  return (
    <div className="mb-[200px] mt-[40px] flex sm:mb-[342px] sm:mt-[60px]">
      <div className="mx-auto w-[100%] max-w-[1200px] p-4 sm:p-8 xl:p-0">
        <div className="relative flex items-center justify-between">
          <div
            className="absolute right-[90px] z-10 h-[45px] w-[40px] sm:hidden"
            style={{
              background:
                'linear-gradient(to right, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 1) 100%)',
            }}
          />
          <Swiper
            spaceBetween={0}
            slidesPerView={2}
            breakpoints={{
              375: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {categoryOptions.map((category) => (
              <SwiperSlide key={category}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    categoryValue === category
                      ? 'h-[41px] w-[80px] rounded-[15px] bg-green-0B text-lg font-medium text-white sm:h-[58px] sm:w-[120px] sm:text-2lg xl:w-[127px]'
                      : 'bg-w h-[41px] w-[80px] rounded-[15px] border border-green-0B text-lg font-medium text-green-0B sm:h-[58px] sm:w-[120px] sm:text-2lg xl:w-[127px]'
                  }`}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <DropDown
              label={sortLabel}
              options={sortOptions}
              setLabel={setSortLabel}
              setValue={setSortValue}
              size="small"
              text="green"
              border="green"
            />
          </div>
        </div>
        <div className="mb-6 mt-6 text-2lg font-bold sm:mb-8 sm:mt-9 sm:text-3xl">
          {categoryValue === '' ? '🛼 모든 체험' : `${categoryValue}`}
        </div>

        {isLoading && <p>로딩 중...</p>}
        {error && <p>에러가 발생했습니다: {error.message}</p>}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4 2xl:gap-8">
          {data?.activities.map((item: Activity) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => handleClickCard(item.id)}
            />
          ))}
        </div>

        <div className="sm:mt-18 mt-9 flex justify-center xl:mt-16">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="inline-block mx-1 px-[15.5px] py-[7px] sm:px-6 sm:py-3 border rounded-[15px] border border-green-0B"
            activeClass="bg-green-0B text-white"
            hideDisabled={false}
            hideFirstLastPages={true}
            prevPageText="<"
            nextPageText=">"
            disabledClass="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
