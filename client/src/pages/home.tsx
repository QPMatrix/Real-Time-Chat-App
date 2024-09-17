import MainLayout from '../layout/main-layout.tsx';
import Sidebar from '../components/sidebar.tsx';
import AuthOverlay from '../components/auth-overlay.tsx';
import ProfileSettings from '../components/profile-settings.tsx';

const Home = () => {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
      </>
    </MainLayout>
  );
};

export default Home;
