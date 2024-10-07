import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { IconPlusTime, IconMinusTime } from '@/assets/icons';

interface ScheduleInputProps {
  time: { date: Date; startTime: string; endTime: string };
  onScheduleChange: (date: Date, startTime: string, endTime: string) => void;
  addSchedule: () => void;
}

const ScheduleInput: React.FC<ScheduleInputProps> = ({
  time,
  onScheduleChange,
  addSchedule,
}) => {
  return (
    <div className="flex justify-between">
      <DatePicker
        selected={time.date}
        onChange={(date) =>
          onScheduleChange(date as Date, time.startTime, time.endTime)
        }
        dateFormat="yyyy-MM-dd"
        className="block h-[56px] w-[379px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
      />
      <input
        type="time"
        value={time.startTime}
        onChange={(e) =>
          onScheduleChange(time.date, e.target.value, time.endTime)
        }
        className="block h-[56px] w-[140px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
      />
      <input
        type="time"
        value={time.endTime}
        onChange={(e) =>
          onScheduleChange(time.date, time.startTime, e.target.value)
        }
        className="block h-[56px] w-[140px] rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
      />
      <button
        type="button"
        onClick={addSchedule}
        className="text-blue-500 hover:text-blue-700"
      >
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
