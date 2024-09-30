import React from 'react';
import ReservationCard from './component/ReservationCard';

const MyReservations: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="text-3xl-bold mb-3">예약 내역</div>
      <div className="h-full w-full">
        <ReservationCard />
      </div>
    </div>
  );
};

export default MyReservations;
