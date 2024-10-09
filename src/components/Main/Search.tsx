import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';
import { debounce } from 'lodash';
import SearchForm from '@/components/Main/SearchForm';

interface SearchProps {
  setSearchValue: (value: string) => void;
}

function Search({ setSearchValue }: SearchProps) {
  const [searchValue, setSearchValueLocal] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueLocal(e.target.value);
    debouncedSetSearchValue(e.target.value);
  };

  const debouncedSetSearchValue = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 600),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, [debouncedSetSearchValue]);

  return (
    <div className="absolute top-[180px] z-20 flex w-full sm:top-[490px]">
      <div className="mx-auto flex w-[91%] max-w-[1200px] items-center rounded-[16px] bg-white px-[24px] py-[16px] shadow-sm sm:px-[32px] sm:py-[24px]">
        <div className="flex w-full flex-col">
          <p className="text-lg font-bold text-black-nomad sm:text-xl">
            무엇을 체험하고 싶으신가요?
          </p>
          <SearchForm
            value={searchValue}
            handleInputChange={handleInputChange}
            handleSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
