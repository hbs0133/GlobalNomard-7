import Image from 'next/image';
import bgImg from '@/assets/images/main_bg.png';
import { useState } from 'react';
import BestActivities from '@/components/Main/BestActivities';
import Search from '@/components/Main/Search';
import Category from '@/components/Main/Category';
import SearchResults from '@/components/Main/SearchResults';
import HeaderFooterLayout from '@/components/Layout/HeaderFooterLayout';

function Main() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="w-screen overflow-x-hidden bg-gray-fa">
      <div className="relative h-[240px] sm:h-[550px]">
        <div className="absolute inset-0 z-10 bg-main-gradient" />
        <Image
          src={bgImg}
          alt="메인 헤더 배경이미지"
          priority
          fill
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute top-[29%] z-10 flex w-full justify-center">
          <div className="mx-auto flex w-[91%] max-w-[1200px] flex-col gap-2 xl:gap-5">
            <h1 className="text-2xl font-bold text-white sm:text-main-md xl:text-main-lg">
              함께 배우면 즐거운
              <br /> 스트릿 댄스
            </h1>
            <p className="text-md font-bold text-white sm:text-xl xl:text-2xl">
              1월의 인기 체험 BEST 🔥
            </p>
          </div>
        </div>
        <Search setSearchValue={setSearchValue} />
      </div>
      <div>
        {searchValue ? (
          <>
            <div className="absolute left-[88px] top-[224px] z-20 h-[26px] w-[119px] bg-white text-center text-lg text-gray-a4 sm:left-[93px] sm:top-[564px] sm:w-[140px] xl:left-[422px]">
              내가 원하는 체험은
            </div>
            <SearchResults keyword={searchValue} />
          </>
        ) : (
          <>
            <BestActivities />
            <Category />
          </>
        )}
      </div>
    </div>
  );
}

export default Main;
