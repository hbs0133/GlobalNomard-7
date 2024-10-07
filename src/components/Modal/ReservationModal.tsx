import BaseModal from './BaseModal';
import MiniCalendar from '../Calendar/MiniCalendar';
import Button from '../Button/Button';
import { IconAdd, IconSubtract } from '@/assets/icons';
import Image from 'next/image';

function ReservationModal() {
  return (
    <BaseModal size="reservation" type="nonModal" footerButton={null}>
      <div>
        <div>
          <div>
            <p className="flex items-center">
              <span className="text-3xl font-bold">₩ 1,000</span>{' '}
              <span className="relative left-[7px] top-[1px] text-xl font-regular text-gray-4b">
                /인
              </span>
            </p>
          </div>
          <hr className="my-[10px] border-[0.px] border-gray-dd" />
          <div>
            <p className="text-xl font-bold">날짜</p>
            <div className="flex justify-center">
              <MiniCalendar />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className="text-2lg font-bold">예약 가능한 시간</p>
              <div className="mt-[14px] flex gap-[12px]">
                <button className="rounded-[8px] bg-black-nomad px-[12px] py-[10px] text-white">
                  14:00~15:00
                </button>
                <button className="bg-black-white rounded-[8px] border-[1px] border-black-nomad px-[12px] py-[10px] text-black-nomad">
                  15:00~16:00
                </button>
              </div>
              <hr className="mb-[12px] mt-[16px] border-[0.px] border-gray-dd" />
            </div>
            <div className="mb-[24px]">
              <p className="text-2lg font-bold">참여 인원 수</p>
              <div className="mt-[8px] flex w-[120px] justify-between rounded-[6px] border-[1px] border-gray-e8 p-[10px]">
                <button>
                  <Image src={IconSubtract} alt="인원 수 감소 버튼" />
                </button>
                <span>10</span>
                <button>
                  <Image src={IconAdd} alt="인원 수 증가 버튼" />
                </button>
              </div>
            </div>
            <Button size="largeModal">예약하기</Button>
          </div>
          <hr className="mb-[16px] mt-[24px] border-[0.px] border-gray-dd" />
          <div className="flex justify-between text-xl font-bold">
            <span>총 합계</span>
            <span>₩ 10,000</span>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default ReservationModal;
