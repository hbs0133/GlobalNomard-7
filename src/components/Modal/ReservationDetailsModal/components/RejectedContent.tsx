import DropDown from '@/components/Dropdown/Dropdown';
import ReservationDetailCard from './ReservationDetailCard';

function RejectedContent({ options }: ITabContent) {
  return (
    <div>
      <div className="mb-[24px]">
        <span className="text-2lg font-semibold">예약 날짜</span>
        <div className="mt-[16px]">
          <p className="mb-[5px] text-2lg font-regular">2023년 2월 10일</p>
          <DropDown label="14:00 ~ 15:00" options={options} />
          {/* <div className="mt-[5px] flex h-[56px] w-full gap-[10px] rounded-[4px] border-[1px] border-gray-79">
            </div> */}
        </div>
      </div>
      <div>
        <span className="text-2lg font-semibold">예약 내역</span>
        <div>
          <ReservationDetailCard />
        </div>
      </div>
    </div>
  );
}

export default RejectedContent;
