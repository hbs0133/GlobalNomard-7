import { create } from 'zustand';

const useModalStore = create<IModal>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

export { useModalStore };
