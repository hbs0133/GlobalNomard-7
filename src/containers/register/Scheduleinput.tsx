import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { IconPlusTime } from '@/assets/icons';

interface ScheduleInputProps {
  time: { date: Date | null; startTime: string; endTime: string };
  onScheduleChange: (
    date: Date | null,
    startTime: string,
    endTime: string,
  ) => void;
  addSchedule: () => void;
}

const ScheduleInput: React.FC<ScheduleInputProps> = ({
  time,
  onScheduleChange,
  addSchedule,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-[10px]">
        <label>날짜</label>
        <DatePicker
          selected={time.date} // 수정
          onChange={(date) => {
            onScheduleChange(date, time.startTime, time.endTime);
          }}
          dateFormat="yyyy-MM-dd"
          className="block h-[56px] w-[379px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
          placeholderText="YY/MM/DD"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label>시작시간</label>
        <input
          type="time"
          value={time.startTime}
          onChange={(e) =>
            onScheduleChange(time.date, e.target.value, time.endTime)
          }
          className="block h-[56px] w-[140px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label>종료시간</label>
        <input
          type="time"
          value={time.endTime}
          onChange={(e) =>
            onScheduleChange(time.date, time.startTime, e.target.value)
          }
          className="block h-[56px] w-[140px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
        />
      </div>
      <button type="button" onClick={addSchedule} className="mt-auto">
        <Image
          src={IconPlusTime}
          alt="일정을 추가하는 +모양 아이콘"
          width={56}
          height={56}
        />
      </button>
    </div>
  );
};

export default ScheduleInput;
