import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SideNavCard from '@/components/SideNavCard/SideNavCard';
import Register from '@/containers/register/Register';

interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return (
    <div className="flex flex-col bg-gray-fa">
      <Header />
      <div className="flex justify-center gap-[16px] desktop:gap-[24px] mt-[24px] desktop:mt-[72px] px-[24px] mobile:px-[15px] mb-[200px]">
        <SideNavCard />
        <div className="max-w-[790px] w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
