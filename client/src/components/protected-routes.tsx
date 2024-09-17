import React, { useEffect } from 'react';
import { useUserStore } from '../store/user-store';
import { useGeneralStore } from '../store/general.store';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.id);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId) {
      toggleLoginModal();
    }
  }, [userId, toggleLoginModal]);

  return userId ? <>{children}</> : <>Protected</>;
};

export default ProtectedRoutes;
