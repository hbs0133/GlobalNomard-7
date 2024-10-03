import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ItemCard from './ItemCard';

function Category({ fetchActivities }) {
  const [categoryValue, setCategoryValue] = useState('');
  const [sortValue, setSortValue] = useState('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['category', categoryValue, sortValue],
    queryFn: () =>
      fetchActivities(
        'offset',
        sortValue ? `&sort=${sortValue}` : '',
        categoryValue ? `&category=${categoryValue}` : '',
        '8',
      ),
    staleTime: 60000,
  });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
  };

  const handleCategoryClick = (category: string) => {
    if (categoryValue === category) {
      setCategoryValue('');
    } else {
      setCategoryValue(category);
    }
  };

  return (
    <div className="mt-[40px] flex sm:mt-[60px]">
      <div className="mx-auto w-[100%] max-w-[1200px] pl-4 sm:pl-8 xl:pl-0">
        <div className="flex justify-between">
          <div className="">
            {['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    categoryValue === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  } rounded px-4 py-2`}
                >
                  {category}
                </button>
              ),
            )}
          </div>
          <div className="mt-4">
            <select
              id="sort"
              className="rounded border border-gray-300 px-2 py-1"
              value={sortValue}
              onChange={handleSortChange}
            >
              <option value="" disabled selected hidden>
                가격
              </option>
              <option value="price_asc">가격 낮은순</option>
              <option value="price_desc">가격 높은순</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-xl font-bold text-gray-700">
          {categoryValue === '' ? '🛼 모든 체험' : `${categoryValue}`}
        </div>

        {isLoading && <p>로딩 중...</p>}
        {error && <p>에러가 발생했습니다. {error.message}</p>}

        {/* grid 레이아웃 설정 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 2xl:grid-cols-4 2xl:gap-8">
          {data?.activities.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
