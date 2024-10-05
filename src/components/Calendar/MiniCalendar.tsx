import React, { useState } from 'react';
import { IconCalendarNext, IconCalendarPrev } from '@/assets/icons';
import Image from 'next/image';

const MiniCalendar: React.FC = () => {
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
    const lastDayOfPreviousMonth = daysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
    const totalDaysInGrid = 35;

    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="flex h-[32px] w-full items-center justify-center p-[10px] text-sm font-semibold text-gray-a4"
        >
          {lastDayOfPreviousMonth - i}
        </div>,
      );
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isToday =
        today.getDate() === i &&
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth;
      days.push(
        <div
          key={i}
          className={`flex h-[32px] w-full items-center justify-center p-[10px] text-sm font-semibold ${isToday ? 'rounded-[8px] bg-green-ce' : 'text-gray-4b'}`}
        >
          {i}
        </div>,
      );
    }

    const remainingDays = totalDaysInGrid - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="text-gray-aaa flex h-[32px] w-full items-center justify-center p-[10px] text-sm font-semibold text-gray-a4"
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
    <div className="my-[16px] flex h-[241px] w-[304px] flex-col items-center rounded-[8px] border border-gray-ee px-[27px] pt-[10px]">
      <div className="flex w-full justify-between">
        <button type="button" onClick={() => changeMonth(-1)}>
          <Image
            className="h-[16px] w-[16px]"
            src={IconCalendarPrev}
            alt="이전 달력 버튼"
          />
        </button>
        <h2 className="text-md font-bold">{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
        <button type="button" onClick={() => changeMonth(1)}>
          <Image
            className="h-[16px] w-[16px]"
            src={IconCalendarNext}
            alt="이후 달력 버튼"
          />
        </button>
      </div>
      <div className="grid w-full grid-cols-7">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="flex h-[32px] items-center justify-center p-[10px] text-md font-bold text-gray-4b"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default MiniCalendar;
