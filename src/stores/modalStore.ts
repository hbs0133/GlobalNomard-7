import { create } from 'zustand';

const useModalStore = create<IModal>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),

  isNoticeModalOpen: false,
  setOpenNoticeModal: () => set({ isNoticeModalOpen: true }),
  setCloseNoticeModal: () => set({ isNoticeModalOpen: false }),

  isReservationDetailModalOpen: false,
  setOpenReservationDetailModal: () =>
    set({ isReservationDetailModalOpen: true }),
  setCloseReservationDetailModal: () =>
    set({ isReservationDetailModalOpen: false }),
}));

export { useModalStore };
