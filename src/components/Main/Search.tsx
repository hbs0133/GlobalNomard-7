import { useState } from 'react';

const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="absolute">
        <p>무엇을 체험하고 싶으신가요?</p>
        <form>
          <input
            onChange={handleInputChange}
            placeholder="내가 원하는 체험은"
          />
          <button type="submit">검색하기</button>
        </form>
      </div>
    </>
  );
};

export default Search;
