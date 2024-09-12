import { useState } from 'react';
import SearchForm from './SearchForm';

const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-lg font-bold text-black-nomad">
          무엇을 체험하고 싶으신가요?
        </p>
        <SearchForm
          Value={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Search;
