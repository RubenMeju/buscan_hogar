import { toast } from "react-toastify";

const config = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
// eslint-disable-next-line
export function ToastError(msg) {
  return toast.error(msg, config);
}
