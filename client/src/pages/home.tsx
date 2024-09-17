import MainLayout from '../layout/main-layout.tsx';
import Sidebar from '../components/sidebar.tsx';
import AuthOverlay from '../components/auth-overlay.tsx';

const Home = () => {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <Sidebar />
        Home Page
      </>
    </MainLayout>
  );
};

export default Home;
