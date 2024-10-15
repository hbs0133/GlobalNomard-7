import Image from 'next/image';
import starIcon from '@/assets/icons/ic_like_star.svg';

function ItemCard({ item, onClick }: { item: any; onClick: any }) {
  return (
    <div
      className="flex h-auto w-[168px] cursor-pointer flex-col sm:w-[221px] xl:w-[283px]"
      onClick={onClick}
    >
      <div className="relative h-[168px] w-[168px] sm:h-[221px] sm:w-[221px] xl:h-[283px] xl:w-[283px]">
        <Image
          src={item.bannerImageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-[24px]"
        />
      </div>
      <div className="mt-4 flex flex-col items-start">
        <div className="mb-[6px] flex sm:mb-[20px]">
          <Image src={starIcon} alt="별 아이콘" width={20} height={20} />
          <p className="ml-1 text-lg font-medium">{item.rating}</p>
          <p className="ml-1 text-lg font-medium text-gray-a1">
            ({item.reviewCount})
          </p>
        </div>
        <p className="mb-[15px] h-auto text-2lg font-bold sm:text-2xl">
          {item.title}
        </p>
        <div className="flex items-center gap-[5px]">
          <p className="text-xl font-bold sm:text-[28px] sm:text-xl xl:text-2xl">
            ₩ {item.price.toLocaleString()}
          </p>
          <p className="text-md text-gray-a1">/ 인</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
