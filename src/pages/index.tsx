import React from 'react';
import MyReservations from '@/components/SideNavCard/page';
import { useUserStore } from "@/hooks/useUserStore";

const Home: React.FC = () => {
  const { user, setUser } = useUserStore();

  if (!user)
    return <>
    </>;

  return <>
    <div>
      {user.nickname}
    </div>
    <div>
      {user.id}
    </div>
    <div>
      {user.email}
    </div>
  </>
};

export default Home;
