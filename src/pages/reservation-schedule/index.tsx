'use client';

import React from 'react';
import Infopage from '@/containers/myprofile';
import Layout from '@/components/Layout/layout';
import ReservationSchedule from '@/containers/reservationSchedule/page';

function reservationSchedule() {
  return (
    <Layout>
      <ReservationSchedule />;
    </Layout>
  );
}

export default reservationSchedule;
