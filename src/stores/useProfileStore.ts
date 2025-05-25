/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthApi } from '@/apis';
import { create } from 'zustand';

export const useProfileStore = create((set, _get) => ({
  loadingProfile: true,
  profile: null,
  onGetProfile: async () => {
    if (!localStorage.getItem('api_token')) {
      set(() => ({ loadingProfile: false }));
      return;
    }
    try {
      const response = await AuthApi.profile();
      set(() => ({
        profile: response.context
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ loadingProfile: false }))
    }
  },
  onLogout: () => {
    localStorage.removeItem('api_token');
    set(() => ({ profile: null }))
  }
}))