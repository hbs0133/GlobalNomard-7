import React from 'react';
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
