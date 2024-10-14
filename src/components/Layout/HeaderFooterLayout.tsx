import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface HeaderFooterLayout {
  children: React.ReactNode;
}

const HeaderFooterLayout = ({ children }: HeaderFooterLayout) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HeaderFooterLayout;
