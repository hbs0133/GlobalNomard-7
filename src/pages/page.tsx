import React from 'react';
import ReservationCard from '../components/SideNavCard/ReservationCard';
import SideNavCard from '../components/SideNavCard/SideNavCard';

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
