import React from 'react';
import SideNavCard from '../SideNavCard/SideNavCard';
import ReservationCard from './component/ReservationCard';

const MyReservations: React.FC = () => {
  return (
    <div>
      <div className="text-3xl-bold mb-3">예약 내역</div>
      <SideNavCard />
      <ReservationCard />
    </div>
  );
};
export default MyReservations;
