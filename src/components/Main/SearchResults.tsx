import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchActivities, {
  FetchActivitiesResponse,
} from '@/services/fetchActivities';
import ItemCard from '@/components/Main/ItemCard';
import Pagination from 'react-js-pagination';

interface SearchResultsProps {
  keyword: string;
}

function SearchResults({ keyword }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1275) {
        setItemsPerPage(12);
      } else if (width >= 650) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { isLoading, error, data } = useQuery<FetchActivitiesResponse>({
    queryKey: ['searchResults', keyword, currentPage, itemsPerPage],
    queryFn: () =>
      fetchActivities({
        method: 'offset',
        keyword,
        page: currentPage.toString(),
        size: itemsPerPage.toString(),
      }),
    enabled: !!keyword,
    staleTime: 60000,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
    }
  }, [data]);

  if (isLoading) return <p>로딩 중입니다...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  return (
    <div className="relative mb-[200px] mt-[93px] flex sm:mb-[342px] sm:mt-[142px] 2xl:mt-[158px]">
      <div className="mx-auto w-[100%] max-w-[1200px] pl-4 sm:pl-8 xl:pl-0">
        <div className="mt-4 px-4">
          <div className="mb-3 flex items-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{keyword}</h2>
            <p className="text-2xl font-regular sm:text-3xl">
              으로 검색한 결과입니다.
            </p>
          </div>
          <p className="mb-4 text-lg font-regular">
            총 {data?.totalCount}개의 결과
          </p>
          {data?.activities.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {data.activities.map((activity) => (
                <ItemCard key={activity.id} item={activity} />
              ))}
            </div>
          ) : (
            <p className="mt-[93px] sm:mt-[142px] 2xl:mt-[158px]">
              검색 결과가 없습니다.
            </p>
          )}
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
    </div>
  );
}

export default SearchResults;
