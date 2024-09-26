interface IModal {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
}

interface IModalPortal {
  children: ReactNode;
}

interface IBaseModal {
  size: 'alert' | 'cancel' | 'review' | 'reservation' | 'notice';
  titleContent?: null | string;
  tStyle?: 'review' | 'reservation' | 'notice';
  footerButton: null | 1 | 2;
  children: ReactNode;
}

type IAlertModal = Omit<IBaseModal, 'title'>;
