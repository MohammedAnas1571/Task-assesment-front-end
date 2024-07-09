import { GoAlertFill } from "react-icons/go";
import { Modal, ModalContent, ModalTrigger } from "./Modal";

type Props = {
  children: React.ReactElement;
  title: React.ReactNode;
  description: React.ReactNode;
  onCancel?: () => void;
  onConfirm: () => void;
};

export default function AlertDialog({
  children,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>
        {({ closeModal }) => (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 items-center">
              <GoAlertFill size={24} className="text-red-600" />
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <p>{description}</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onCancel?.();
                  closeModal();
                }}
                className="px-8 border border-gray-300 rounded-full h-9"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  closeModal();
                }}
                className="px-8 bg-violet-600 text-white rounded-full h-9"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
