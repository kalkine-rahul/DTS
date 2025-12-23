import { create } from 'zustand'

interface AuthModalState {
  isLoginOpen: boolean
  isSignupOpen: boolean
  openLogin: () => void
  openSignup: () => void
  closeLogin: () => void
  closeSignup: () => void
  closeAll: () => void
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
  openSignup: () => set({ isLoginOpen: false, isSignupOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  closeSignup: () => set({ isSignupOpen: false }),
  closeAll: () => set({ isLoginOpen: false, isSignupOpen: false }),
}))

