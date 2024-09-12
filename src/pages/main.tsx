import Image from 'next/image';
import bgImg from '@/assets/images/main_bg.png';
import Search from '@/components/Main/Search';

const Main = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-fa">
        <div className="relative h-[240px] w-screen sm:h-[550px]">
          <div className="absolute inset-0 z-10 bg-main-gradient" />
          <Image
            src={bgImg}
            alt="메인 헤더 배경이미지"
            priority
            fill
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute left-[18%] top-[29%] z-10 flex flex-col gap-2 xl:gap-5">
            <h1 className="text-2xl font-bold text-white sm:text-main-md xl:text-main-lg">
              함께 배우면 즐거운
              <br /> 스트릿 댄스
            </h1>
            <p className="text-md font-bold text-white sm:text-xl xl:text-2xl">
              1월의 인기 체험 BEST 🔥
            </p>
          </div>
          <div className="absolute top-[180px] z-20 flex w-screen justify-center sm:top-[490px]">
            <div className="flex w-[91%] max-w-[1200px] items-center justify-center rounded-[16px] bg-white px-[24px] py-[16px] shadow-sm sm:px-[32px] sm:py-[24px]">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
