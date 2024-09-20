import leadingIcon from '@/assets/icons/ic-leading.svg';
import Image from 'next/image';

function SearchForm({ value, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative inline-block w-full">
        <Image
          src={leadingIcon}
          alt="침대아이콘"
          className="absolute top-[19px] sm:top-[36px]"
        />
        <div className="mt-[15px] flex gap-[12px] sm:mt-[32px]">
          <input
            className="h-[56px] w-[100%] rounded-[4px] border border-gray-79 pl-[48px] text-md"
            value={value}
            onChange={handleInputChange}
            placeholder="내가 원하는 체험은"
          />
          <button
            type="submit"
            className="bold h-[56px] w-[60%] max-w-[136px] rounded-[4px] bg-black-nomad text-lg text-white"
          >
            검색하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
