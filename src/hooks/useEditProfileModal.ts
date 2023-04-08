import { useDispatch } from "react-redux";
import { useAppSelector } from "./reduxHooks";
import {
  onClose,
  onOpen,
  toggleModal,
} from "@/store/features/editProfileModalSlice";

const useEditProfileModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useAppSelector((state) => state.editProfileModal);

  const close = () => dispatch(onClose());
  const open = () => dispatch(onOpen());
  const toggle = () => dispatch(toggleModal());

  return { isOpen, close, open, toggle };
};
export default useEditProfileModal;
