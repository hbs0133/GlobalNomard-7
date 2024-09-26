interface IModal {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
}

interface IModalPortal {
  children: ReactNode;
}

interface IBaseModal {
  size: 'alert' | 'confirm' | 'review' | 'reservation' | 'notice';
  titleContent?: null | string;
  tStyle?: 'review' | 'reservation' | 'notice';
  xStyle?: 'review' | 'reservation' | 'notice';
  footerButton: null | 1 | 2;
  children: ReactNode;
}

type IAlertModal = Omit<IBaseModal, 'title'>;

type IConfirmModal = Omit<IBaseModal, 'title'>;
