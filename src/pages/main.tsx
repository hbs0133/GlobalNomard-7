import Image from 'next/image';
import bgImg from '@/assets/images/main_bg.png';
import axios from 'axios';
import mockData from '@/components/Main/mockData';
import BestActivities from '@/components/Main/BestActivities';
import Search from '@/components/Main/Search';
import Category from '@/components/Main/Category';

function Main() {
  const BASE_URL = 'https://sp-globalnomad-api.vercel.app/7-7';

  const fetchActivities = async (
    method = 'offset',
    category = '',
    sort = '',
    size = '20',
  ) => {
    const res = await axios.get(`
  ${BASE_URL}/activities?method=${method}${category}${sort}&page=1&size=${size}`);
    // return mockData;
    return res.data;
  };

  return (
    <div className="w-screen bg-gray-fa">
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
        <Search BASE_URL={BASE_URL} />
      </div>
      <div>
        <BestActivities fetchActivities={fetchActivities} />
      </div>
      <Category fetchActivities={fetchActivities} />
    </div>
  );
}

export default Main;
