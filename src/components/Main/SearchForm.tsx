const SearchForm = ({ Value, handleInputChange, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={Value}
          onChange={handleInputChange}
          placeholder="내가 원하는 체험은"
        />
        <button type="submit">검색하기</button>
      </form>
    </>
  );
};

export default SearchForm;
