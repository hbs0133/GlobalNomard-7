import Button from '@/components/Button/Button';

function ReservationDetailCard() {
  return (
    <div className="mt-[16px]">
      <div className="h-[116px] w-full rounded-[4px] border-[1px] border-gray-dd px-[16px] pb-[12px] pt-[9px]">
        <div>
          <div className="flex gap-[10px]">
            <span className="text-lg font-semibold text-gray-79">닉네임</span>
            <span className="text-lg font-medium">정민철</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-lg font-semibold text-gray-79">인원</span>
            <span className="text-lg font-medium">12명</span>
          </div>
        </div>
        <div className="flex justify-end gap-[6px] pt-[5px]">
          <Button size="smallModal" solid="yes" status="active">
            승인하기
          </Button>
          <Button size="smallModal" solid="no" status="active">
            거절하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetailCard;
