import { Modal, ModalContent, ModalTrigger } from "./Modal";

type Props = {
  children: React.ReactElement;
};

export default function ForgetPasswordDialog({ children }: Props) {
  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>
        {({ closeModal }) => (
          <div className="flex flex-col items-start">
            <h1>Forget Password</h1>
            <p>
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <input type="text" />
            <button>Request reset link</button>
            <button onClick={closeModal}>Back to login</button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
