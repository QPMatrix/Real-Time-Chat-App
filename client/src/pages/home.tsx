import MainLayout from '../layout/main-layout.tsx';
import Sidebar from '../components/sidebar.tsx';

const Home = () => {
  return (
    <MainLayout>
      <>
        <Sidebar />
        Home Page
      </>
    </MainLayout>
  );
};

export default Home;
