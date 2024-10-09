import React from 'react';

import MyReservations from '@/components/SideNavCard/page';
import { useUserStore } from '@/hooks/useUserStore';
import ReservationModal from '@/components/Modal/ReservationModal';
import { useModalStore } from '@/stores/modalStore';
import Main from './main';

const Home: React.FC = () => {
  const { setOpenModal } = useModalStore();
  return (
    <div>
      <Main />
    </div>
  );

};

export default Home;
