import { IconStarOn, IconStarOff } from '@/assets/icons/index';
import ImgTest from '@/assets/images/img_empty.png';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Button from '@/components/Button/Button';
import BaseModal from './BaseModal';

const STARS = [0, 1, 2, 3, 4];

function ReviewModal() {
  const [isStarOn, setIsStarOn] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleRateClick = (starIdx: number) => {
    if (starIdx === 0) {
      setIsStarOn([true, false, false, false, false]);
      setRating(1);
    } else if (starIdx === 1) {
      setIsStarOn([true, true, false, false, false]);
      setRating(2);
    } else if (starIdx === 2) {
      setIsStarOn([true, true, true, false, false]);
      setRating(3);
    } else if (starIdx === 3) {
      setIsStarOn([true, true, true, true, false]);
      setRating(4);
    } else {
      setIsStarOn([true, true, true, true, true]);
      setRating(5);
    }
  };

  return (
    <BaseModal titleContent="후기 작성" size="review" footerButton={null}>
      <div className="mobile:mt-[35px] mt-[41px]">
        <div className="mobile:mb-[12px] mb-[24px] flex items-center">
          <Image
            className="mobile:h-[100px] mobile:w-[100px] mr-[8px] h-[126px] w-[126px] rounded-[12px]"
            src={ImgTest}
            alt="테스트 이미지"
          />
          <div className="mobile:gap-[6px] flex flex-col gap-[12px]">
            <p className="mobile:text-lg text-xl font-bold">
              함께 배우면 즐거운 스트릿 댄스
            </p>
            <p className="mobile:text-md text-2lg font-regular">
              2023. 2. 14 · 11:00 - 12:30 · 10명
            </p>
            <hr className="border-[1px] border-black-nomad opacity-10" />
            <p className="mobile:text-[20px] text-3xl font-bold">₩10,000</p>
          </div>
        </div>
        <form>
          <div className="flex h-[100px] items-center justify-center gap-[9.75px]">
            {STARS.map((starIdx) => (
              <Image
                key={starIdx}
                className="h-[49.01px] w-[52.5px] cursor-pointer"
                src={isStarOn[starIdx] ? IconStarOn : IconStarOff}
                alt="평점아이콘"
                onClick={() => handleRateClick(starIdx)}
              />
            ))}
          </div>
          <textarea
            className="y-full mobile:mb-[24px] mobile:mt-[12px] mobile:h-[346px] my-[24px] flex h-[240px] w-full resize-none rounded-[4px] border-[1px] border-gray-79 p-[16px] text-lg font-regular outline-none placeholder:text-gray-79"
            placeholder="후기를 작성해주세요"
            value={content}
            onChange={handleTextareaChange}
          />

          <Button size="largeModal">작성하기</Button>
        </form>
      </div>
    </BaseModal>
  );
}

export default ReviewModal;
