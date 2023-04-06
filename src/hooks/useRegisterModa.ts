import {
  onOpen,
  onClose,
  toggleModal,
} from "@/store/features/registerModalSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useRegisterModal = () => {
  const { isOpen } = useAppSelector((state) => state.registerModal);
  const dispatch = useAppDispatch();

  const open = () => dispatch(onOpen());
  const close = () => dispatch(onClose());
  const toggle = () => dispatch(toggleModal());

  return { open, close, toggle, isOpen };
};
export default useRegisterModal;
