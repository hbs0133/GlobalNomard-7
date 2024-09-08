import Image from 'next/image';
import bgImg from '@/assets/images/main_bg.png';

const Main = () => {
  return (
    <>
      <div className="relative h-[240px] w-screen sm:h-[550px]">
        <div className="bg-main-gradient absolute inset-0 z-10" />
        <Image
          src={bgImg}
          alt="메인 헤더 배경이미지"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute left-[18%] top-[29%] z-10 flex flex-col gap-2 xl:gap-5">
          <h1 className="xl:text-main-lg sm:text-main-md text-2xl font-bold text-white">
            함께 배우면 즐거운
            <br /> 스트릿 댄스
          </h1>
          <p className="text-md font-bold text-white sm:text-xl xl:text-2xl">
            1월의 인기 체험 BEST 🔥
          </p>
        </div>
      </div>
    </>
  );
};

export default Main;
