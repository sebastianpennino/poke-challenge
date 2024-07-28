import cx from "classnames";

type ModalProps = {
  mode: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  mode,
}: ModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        {children}
        <div className="mt-4 text-center">
          <button
            className={cx("text-white px-4 py-2 rounded", {
              "bg-blue-500": mode === "success",
              "bg-red-500": mode === "error",
            })}
            onClick={onClose}
          >
            {mode === "success" ? "Ok" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
