import { useState } from 'react';
import SearchForm from '@/components/Main/SearchForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import mockData from '@/components/Main/mockData';

function Search({ BASE_URL }) {
  const [searchValue, setSearchValue] = useState('');
  const [submitValue, setSubmitValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitValue(searchValue);
  };

  const getActivities = async (keyword) => {
    if (!keyword) return;
    const res = await axios.get(
      `${BASE_URL}/activities?method=offset&keyword=${keyword}&page=1&size=20`,
    );
    return res.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['activities', submitValue],
    queryFn: () => getActivities(submitValue),
    enabled: !!submitValue,
  });

  return (
    <div className="sm:top-[490px] absolute top-[180px] z-20 flex w-full">
      <div className="sm:px-[32px] sm:py-[24px] mx-auto flex w-[91%] max-w-[1200px] items-center rounded-[16px] bg-white px-[24px] py-[16px] shadow-sm">
        <div className="flex w-full flex-col">
          <p className="sm:text-xl text-lg font-bold text-black-nomad">
            무엇을 체험하고 싶으신가요?
          </p>
          <SearchForm
            value={searchValue}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
