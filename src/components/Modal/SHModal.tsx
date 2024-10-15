import BaseModal from './SHBaseModal';

function AlertModal({ children, onConfirm }: IAlertModal) {
  return (
    <BaseModal
      type="modal"
      size="alert"
      onConfirm={onConfirm || (() => {})}
      footerButton={1}
    >
      <div className="flex h-full flex-col items-center justify-end">
        <p className="text-center text-lg font-medium">{children}</p>
      </div>
    </BaseModal>
  );
}

export default AlertModal;
