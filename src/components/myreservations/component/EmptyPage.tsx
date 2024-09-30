import empty from '@/assets/images/img_empty.png';
import Image from 'next/image';

const EmptyPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mb-[300px] mt-[60px] flex w-full flex-col items-center justify-center md:mb-[481px] md:mt-[56px] xl:mb-[349px] xl:mt-[86px]">
          <Image
            src={empty}
            className="h-[200px] w-[200px] xl:h-[240px] xl:w-[240px]"
            alt="빈 페이지"
          />
          <div className="text-2xl text-gray-700">
            아직 등록한 체험이 없어요.
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyPage;
