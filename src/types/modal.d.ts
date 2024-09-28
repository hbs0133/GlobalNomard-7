interface IModal {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
}

interface IModalPortal {
  children: ReactNode;
}

interface IBaseModal {
  type: 'modal' | 'nonModal';
  size:
    | 'alert'
    | 'confirm'
    | 'review'
    | 'reservationLarge'
    | 'reservationMedium'
    | 'notice';
  titleContent?: null | string;
  tStyle?: 'review' | 'reservation' | 'notice';
  xStyle?: 'review' | 'reservation' | 'notice';
  footerButton: null | 1 | 2;
  children: ReactNode;
}

type IAlertModal = Omit<IBaseModal, 'title'>;

type IConfirmModal = Omit<IBaseModal, 'title'>;

interface ITabContent {
  options: { label: string; value: string }[];
}
