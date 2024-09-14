import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GeneralState {
  isProfileSettingsOpen: boolean;
  isLoginModalOpen: boolean;
  isCreateRoomModalOpen: boolean;
  toggleProfileSettings: () => void;
  toggleLoginModal: () => void;
  toggleCreateRoomModal: () => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      isCreateRoomModalOpen: false,
      isLoginModalOpen: false,
      isProfileSettingsOpen: false,
      toggleCreateRoomModal: () => set((state) => ({ isCreateRoomModalOpen: !state.isCreateRoomModalOpen })),
      toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
      toggleProfileSettings: () => set((state) => ({ isProfileSettingsOpen: !state.isProfileSettingsOpen })),
    }), {
      name: 'general-storage',
    },
  ),
);