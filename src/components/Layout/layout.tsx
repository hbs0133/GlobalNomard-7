import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SideNavCard from '@/components/SideNavCard/SideNavCard';
import Register from '@/containers/register/Register';

interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return (
    <div className="flex flex-col items-center bg-gray-fa">
      <Header />
      <div className="mt-[72px] flex gap-[24px]">
        <SideNavCard />
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
