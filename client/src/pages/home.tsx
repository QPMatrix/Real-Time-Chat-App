import MainLayout from '../layout/main-layout.tsx';
import Sidebar from '../components/sidebar.tsx';
import AuthOverlay from '../components/auth-overlay.tsx';
import ProfileSettings from '../components/profile-settings.tsx';
import ProtectedRoutes from '../components/protected-routes.tsx';
import RoomList from '../components/room-list.tsx';
import { Flex } from '@mantine/core';
import AddChatroom from '../components/add-chatroom.tsx';

const Home = () => {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <ProfileSettings />
        <ProtectedRoutes>
          <AddChatroom />
          <Flex direction={{ base: 'column', sm: 'row' }} w="100vw">
            <RoomList />
          </Flex>
        </ProtectedRoutes>
        <Sidebar />
      </>
    </MainLayout>
  );
};

export default Home;
