interface IModal {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
  isNoticeModalOpen: boolean;
  setOpenNoticeModal: () => void;
  setCloseNoticeModal: () => void;

  isReservationDetailModalOpen: boolean;
  setOpenReservationDetailModal: () => void;
  setCloseReservationDetailModal: () => void;
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
  onConfirm?: () => void;
  modalPosition?: ModalPosition;
  notificationsData?: any;
}

type IAlertModal = Pick<IBaseModal, 'children'> & {
  onConfirm?: () => void;
};

type IConfirmModal = Pick<IBaseModal, 'children'>;

interface ITabContent {
  options: { label: string; value: string }[];
  selectedDate: Date;
  reservations?: any;
  label?: any;
  setValue?: any;
  approvedReservations?: any;
  setLabel?: any;
  rejectedReservations?: any;
  filteredReservations?: any;
}

interface IReservationModal {
  activityId: string;
}

type ModalPosition = {
  top: number;
  left: number;
};

interface IReservationDetailsModal {
  modalPosition: ModalPosition;
  selectedDate: Date;
  reservations?: any;
  activityId?: any;
}
