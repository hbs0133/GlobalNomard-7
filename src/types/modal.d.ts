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
    | 'reservation'
    | 'reservationDetailLarge'
    | 'reservationDetailMedium'
    | 'notice';
  titleContent?: null | string;
  tStyle?: 'review' | 'reservationDetail' | 'notice';
  xStyle?: 'review' | 'reservationDetail' | 'notice';
  footerButton: null | 1 | 2;
  children: ReactNode;
}

type IAlertModal = Pick<IBaseModal, 'children'>;

type IConfirmModal = Pick<IBaseModal, 'children'>;

interface ITabContent {
  options: { label: string; value: string }[];
}

interface IReservationModal {
  activityId: string;
}
