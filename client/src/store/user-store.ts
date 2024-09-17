import { User } from '../gql/graphql.ts';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  id: string | null;
  avatarUrl: string | null;
  fullName: string;
  email?: string;
  updateProfileImage: (img: string) => void;
  updateProfile: (fullname: string) => void;
  setUserData: (data: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      avatarUrl: null,
      fullName: '',
      email: '',
      updateProfileImage: (img: string) => {
        set(() => ({ avatarUrl: img }));
      },
      updateProfile: (fullname: string) => {
        set(() => ({ fullName: fullname }));
      },
      setUserData: (data: User) => {
        set(() => ({
          id: data.id,
          avatarUrl: data.avatarUrl,
          fullName: data.fullName,
          email: data.email,
        }));
      },
    }),
    {
      name: 'user-store',
    }
  )
);
