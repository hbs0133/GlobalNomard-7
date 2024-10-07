import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Category({ fetchActivities }) {
  const [categoryValue, setCategoryValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

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
    <div className="mt-[40px] flex sm:mt-[60px]">
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
            className="flex justify-start"
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
                spaceBetween: 0,
              },
            }}
          >
            {['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'].map(
              (category) => (
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
              ),
            )}
          </Swiper>
          <div className="">
            <select
              id="sort"
              className="bg-w xl:w-[127px]rounded h-[41px] w-[90px] rounded-[15px] border border-gray-300 border-green-0B px-2 py-1 text-lg font-medium text-green-0B sm:h-[53px] sm:w-[120px] sm:text-2lg"
              value={sortValue}
              onChange={handleSortChange}
            >
              <option value="" disabled selected hidden>
                가격
              </option>
              <option className="h-[41px] w-[90px]" value="price_asc">
                가격 낮은순
              </option>
              <option className="h-[41px] w-[90px]" value="price_desc">
                가격 높은순
              </option>
            </select>
          </div>
        </div>
        <div className="mb-6 mt-6 text-2lg font-bold sm:mb-8 sm:mt-9 sm:text-3xl">
          {categoryValue === '' ? '🛼 모든 체험' : `${categoryValue}`}
        </div>

        {isLoading && <p>로딩 중...</p>}
        {error && <p>에러가 발생했습니다. {error.message}</p>}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4 2xl:gap-8">
          {data?.activities.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="sm:mt-18 mt-9 xl:mt-16">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="inline-block px-3 py-1 border rounded"
            activeClass="bg-green-700 text-white"
            hideDisabled={false}
            hideFirstLastPages={true}
            prevPageText="‹"
            nextPageText="›"
            disabledClass="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
