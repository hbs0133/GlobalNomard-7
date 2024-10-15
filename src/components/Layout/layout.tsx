import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SideNavCard from '@/components/SideNavCard/SideNavCard';

interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return (
    <div className="flex flex-col bg-gray-fa">
      <Header />
      <div className="mb-[200px] mt-[24px] flex justify-center gap-[16px] px-[24px] mobile:px-[15px] desktop:mt-[72px] desktop:gap-[24px]">
        <SideNavCard />
        <div className="w-full max-w-[790px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
