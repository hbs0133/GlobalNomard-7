import SideNavCard from './components/SideNavCard/SideNavCard';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full xl:gap-6">
      <div className="hidden md:flex md:w-[251px] xl:w-[32%]">
        <SideNavCard />
      </div>
      <div className="w-full md:ml-4 md:flex-1 xl:ml-0 xl:w-[68%]">
        {children}
      </div>
    </div>
  );
}
