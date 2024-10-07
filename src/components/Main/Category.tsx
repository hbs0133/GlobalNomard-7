import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import ItemCard from './ItemCard';
import DropDown from '@/components/Dropdown/Dropdown'; // DropDown 컴포넌트를 가져옵니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Category({ fetchActivities }) {
  const [categoryValue, setCategoryValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [sortLabel, setSortLabel] = useState('가격'); // DropDown의 기본 라벨
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const sortOptions = [
    { label: '가격 낮은순', value: 'price_asc' },
    { label: '가격 높은순', value: 'price_desc' },
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

  const { isLoading, error, data } = useQuery({
    queryKey: ['category', categoryValue, sortValue, currentPage, itemsPerPage],
    queryFn: () =>
      fetchActivities(
        'offset',
        sortValue ? `&sort=${sortValue}` : '',
        categoryValue ? `&category=${categoryValue}` : '',
        currentPage,
        itemsPerPage.toString(),
      ),
    staleTime: 60000,
  });

  const handleCategoryClick = (category) => {
    setCategoryValue((prev) => (prev === category ? '' : category));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
    }
  }, [data]);

  return (
    <div className="sm:mt-[60px] sm:mb-[342px] mb-[200px] mt-[40px] flex">
      <div className="sm:p-8 xl:p-0 mx-auto w-[100%] max-w-[1200px] p-4">
        <div className="relative flex items-center justify-between">
          <div
            className="sm:hidden absolute right-[90px] z-10 h-[45px] w-[40px]"
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
                      ? 'sm:h-[58px] sm:w-[120px] sm:text-2lg xl:w-[127px] h-[41px] w-[80px] rounded-[15px] bg-green-0B text-lg font-medium text-white'
                      : 'bg-w sm:h-[58px] sm:w-[120px] sm:text-2lg xl:w-[127px] h-[41px] w-[80px] rounded-[15px] border border-green-0B text-lg font-medium text-green-0B'
                  }`}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="">
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
        <div className="sm:mb-8 sm:mt-9 sm:text-3xl mb-6 mt-6 text-2lg font-bold">
          {categoryValue === '' ? '🛼 모든 체험' : `${categoryValue}`}
        </div>

        {isLoading && <p>로딩 중...</p>}
        {error && <p>에러가 발생했습니다. {error.message}</p>}

        <div className="sm:grid-cols-3 sm:gap-6 xl:grid-cols-4 2xl:gap-8 grid grid-cols-2 gap-4">
          {data?.activities.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="sm:mt-18 xl:mt-16 mt-9 flex justify-center">
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
