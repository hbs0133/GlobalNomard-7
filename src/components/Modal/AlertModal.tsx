import BaseModal from './BaseModal';

function AlertModal({ children }: IAlertModal) {
  return (
    <BaseModal type="modal" size="alert" footerButton={1}>
      <div className="flex h-full flex-col items-center justify-end">
        <p className="text-center text-lg font-medium">{children}</p>
      </div>
    </BaseModal>
  );
}

export default AlertModal;
