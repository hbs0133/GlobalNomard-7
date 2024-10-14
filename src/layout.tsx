import React from 'react';
import SideNavCard from './components/SideNavCard/SideNavCard';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNavCard />
      {children}
    </>
  );
}
