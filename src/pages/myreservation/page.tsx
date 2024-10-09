import React from 'react';
import SideNavCard from '../../components/SideNavCard/SideNavCard';
import ReservationCard from '../../components/myreservations/component/ReservationCard';

const MyReservations: React.FC = () => {
  return (
    <div className="flex w-full xl:gap-6">
      <div className="text-3xl-bold mb-3">예약 내역</div>
      <div className="md:flex md:w-[251px] xl:w-[32%]">
        <SideNavCard />
      </div>
      <div className="w-full md:ml-4 md:flex-1 xl:ml-0 xl:w-[68%]">
        <ReservationCard />
      </div>
    </div>
  );
};
export default MyReservations;
