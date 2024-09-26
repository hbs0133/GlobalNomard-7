import { IconEllipseBlue, IconEllipseRed, IconXMedium } from '@/assets/icons';
import Image from 'next/image';

function NoticeCard() {
  return (
    <div className="mb-[8px] mt-[16px] w-[328px] rounded-[5px] border-[1px] border-gray-cb px-[12px] py-[16px]">
      <div>
        <div className="flex items-center justify-between">
          <Image src={IconEllipseBlue} alt="예약 승인 아이콘" />
          <Image
            className="mobile:hidden"
            src={IconXMedium}
            alt="알림 삭제 버튼"
          />
        </div>
        <p className="mb-[4px] mt-[8px] text-md font-regular">
          함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이
          <span className="text-blue-00"> 승인</span>되었어요.
        </p>
      </div>
      <p className="text-sm font-regular text-gray-a4">1분 전</p>
    </div>
  );
}

export default NoticeCard;
