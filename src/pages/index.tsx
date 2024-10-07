import React from 'react';
import MyReservations from '@/components/SideNavCard/page';
import { useUserStore } from '@/hooks/useUserStore';
import ReservationSchedule from '@/containers/reservationSchedule/page';
import ReservationModal from '@/components/Modal/ReservationModal';
import { useModalStore } from '@/stores/modalStore';

const Home: React.FC = () => {
  const { setOpenModal } = useModalStore();
  return (
    <div>
      {/* <ReservationSchedule /> */}
      <button type="button" onClick={setOpenModal}>
        클릭
      </button>
      <ReservationModal />
    </div>
  );
};

export default Home;
