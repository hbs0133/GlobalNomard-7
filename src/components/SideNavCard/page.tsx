import React from 'react';
import ReservationCard from '../myreservations/component/ReservationCard';
import SideNavCard from './SideNavCard';

const MyReservations: React.FC = () => {
  return (
    <div>
      <div className="mb-3 text-3xl font-bold">예약 내역</div>
      <SideNavCard />
      {/* <ReservationCard /> */}
    </div>
  );
};

export default MyReservations;
