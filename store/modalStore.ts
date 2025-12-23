import { create } from 'zustand'

interface ModalStore {
  isLoginOpen: boolean
  isSignupOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  openSignup: () => void
  closeSignup: () => void
  closeAll: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
  closeLogin: () => set({ isLoginOpen: false }),
  openSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),
  closeSignup: () => set({ isSignupOpen: false }),
  closeAll: () => set({ isLoginOpen: false, isSignupOpen: false }),
}))

