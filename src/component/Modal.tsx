import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
type IModalContext = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<IModalContext | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

export const Modal: React.FC<ProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(
    () => setOpen(true),

    [setOpen]
  );
  const closeModal = useCallback(() => setOpen(false), [setOpen]);
  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalTrigger: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { openModal } = useModal();

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      openModal();
      children.props?.onClick?.(e);
    },
  });
};

type ModalContentProps = {
  children: (props: { closeModal: () => void }) => React.ReactNode;
};

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  const { open, closeModal } = useModal();
  return (
    open &&
    createPortal(
      <>
        <div className="fixed top-0 left-0 h-full w-full z-50 flex flex-col items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl max-h-[80vh] overflow-y-auto">
              {children({
                closeModal,
              })}
            </div>
          </div>
        </div>
      </>,
      document.body
    )
  );
};
