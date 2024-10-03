import Image from 'next/image';

function ItemCard({ item }) {
  return (
    <div className="flex h-auto w-[168px] flex-col items-center sm:w-[221px] 2xl:w-[284px]">
      {/* 이미지 부분 */}
      <div className="relative h-[168px] w-[168px] sm:h-[221px] sm:w-[221px] 2xl:h-[284px] 2xl:w-[284px]">
        <Image
          src={item.bannerImageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-[24px]"
        />
      </div>

      {/* 텍스트 부분 */}
      <div className="mt-2 flex flex-col items-center text-center">
        <div className="mb-[6px] flex items-center">
          <p className="ml-1 text-md font-semibold">{item.rating}</p>
          <p className="ml-1 text-md font-semibold">({item.reviewCount})</p>
        </div>
        <p className="mb-[6px] h-auto text-2lg font-bold sm:text-3xl">
          {item.title}
        </p>
        <div className="flex items-center gap-[5px]">
          <p className="text-lg font-bold sm:text-xl">
            ₩ {item.price.toLocaleString()}
          </p>
          <p className="text-md text-gray-a1">/ 인</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
