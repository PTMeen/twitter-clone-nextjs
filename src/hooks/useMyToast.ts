import { useToast } from "@chakra-ui/react";

type StatusOptions =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined;

const useMyToast = () => {
  const toast = useToast();

  const myToast = (
    title: string,
    description: string,
    status: StatusOptions
  ) => {
    toast({
      title,
      description,
      status,
      isClosable: true,
      duration: 3000,
      position: "top",
    });
  };

  return myToast;
};
export default useMyToast;
