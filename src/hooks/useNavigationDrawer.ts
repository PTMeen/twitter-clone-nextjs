import {
  onClose,
  onOpen,
  toggleDrawer,
} from "@/store/features/navigationDrawerSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useNavigationDrawer = () => {
  const { isOpen } = useAppSelector((state) => state.navigationDrawer);
  const dispatch = useAppDispatch();

  const close = () => dispatch(onClose());
  const open = () => dispatch(onOpen());
  const toggle = () => dispatch(toggleDrawer());

  return { close, open, toggle, isOpen };
};
export default useNavigationDrawer;
