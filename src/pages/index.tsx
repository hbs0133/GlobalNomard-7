import React from 'react';

import MyReservations from '@/components/SideNavCard/page';
import { useUserStore } from '@/hooks/useUserStore';
import Main from './main';

const Home: React.FC = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default Home;
