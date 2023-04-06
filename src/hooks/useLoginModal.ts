import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { onClose, onOpen, toggleModal } from "@/store/features/loginModalSlice";

const useLoginModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.loginModal);

  const close = () => dispatch(onClose());
  const open = () => dispatch(onOpen());
  const toggle = () => dispatch(toggleModal());

  return { close, open, toggle, isOpen };
};
export default useLoginModal;
