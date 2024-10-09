import React, { useState } from 'react';
import { IconCalendarNext, IconCalendarPrev } from '@/assets/icons';
import Image from 'next/image';
import { IconEllipsePending, IconEllipseCompleted } from '@/assets/icons';
import ReservationDetailsModal from '@/components/Modal/ReservationDetailsModal/ReservationDetailsModal';
import { useModalStore } from '@/stores/modalStore';

function Calendar({ reservations, changeMonth, currentDate, activityId }) {
  const { setOpenModal } = useModalStore();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = (currentDate: Date) => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-[154px] w-full border border-gray-e8"
        ></div>,
      );
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const reservationData = reservations.find(
        (reservation) => reservation.date === dateString,
      );

      days.push(
        <div
          key={i}
          className="relative flex h-[154px] w-full cursor-pointer border border-gray-e8 p-[12px] text-xl text-gray-96"
          onClick={(e) => {
            const target = e.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const left = rect.left + window.scrollX;

            setModalPosition({ top, left });
            setSelectedDate(new Date(dateString));
            setOpenModal();
          }}
        >
          {i}
          {reservationData && reservationData.reservations.pending > 0 && (
            <Image
              className="absolute left-[30px]"
              src={IconEllipsePending}
              alt="예약 대기 아이콘"
            />
          )}
          {reservationData && reservationData.reservations.completed > 0 && (
            <Image
              className="absolute left-[50px]"
              src={IconEllipseCompleted}
              alt="예약 완료 아이콘"
            />
          )}
          {reservationData && reservationData.reservations.confirmed > 0 && (
            <Image
              className="absolute left-[70px]"
              src={IconEllipsePending}
              alt="예약 확인 아이콘"
            />
          )}
          {reservationData && (
            <div className="absolute bottom-0 right-[0px] flex h-[23px] w-full items-center rounded-[4px] bg-blue-00 px-[4px] py-[3px] text-sm font-medium text-white">
              {reservationData.reservations.pending > 0 &&
                `예약 ${reservationData.reservations.pending}`}
              {reservationData.reservations.completed > 0 &&
                `완료 ${reservationData.reservations.completed}`}
              {reservationData.reservations.confirmed > 0 &&
                `확인 ${reservationData.reservations.confirmed}`}
            </div>
          )}
        </div>,
      );
    }

    return days;
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
            className="border border-gray-e8 p-[12px] text-lg font-medium text-gray-96"
          >
            {day}
          </div>
        ))}
        {renderDays(currentDate)}
      </div>
      <ReservationDetailsModal
        modalPosition={modalPosition}
        selectedDate={selectedDate}
        reservations={reservations}
        activityId={activityId}
      />
    </div>
  );
}

export default Calendar;
