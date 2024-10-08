import React, { useState } from 'react';
import { IconCalendarNext, IconCalendarPrev } from '@/assets/icons';
import Image from 'next/image';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="border-gray-e8 h-[154px] w-full border"
        ></div>,
      );
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(
        <div
          key={i}
          className="border-gray-e8 text-gray-96 flex h-[154px] w-full border p-[12px] text-xl"
        >
          {i}
        </div>,
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + increment),
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="mt-[30px] flex flex-col items-center">
      <div className="mb-[18px] flex w-[342px] justify-between">
        <button type="button" onClick={() => changeMonth(-1)}>
          <Image src={IconCalendarPrev} alt="이전 달력 버튼" />
        </button>
        <h2 className="text-xl font-bold">{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
        <button type="button" onClick={() => changeMonth(1)}>
          <Image src={IconCalendarNext} alt="이후 달력 버튼" />
        </button>
      </div>
      <div className="grid w-full grid-cols-7">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div
            key={day}
            className="border-gray-e8 text-gray-96 border p-[12px] text-lg font-medium"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
