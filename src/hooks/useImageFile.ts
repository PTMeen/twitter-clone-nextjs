import { ChangeEvent, useEffect, useState } from "react";
import useMyToast from "./useMyToast";

const useImageFile = () => {
  const myToast = useMyToast();
  const [file, setFile] = useState<null | File>(null);
  const [fileUrl, setFileUrl] = useState<null | string>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image")) {
      return myToast("Invalid file", "Please select a valid image", "error");
    }

    if (file.size > 1_000_000) {
      return myToast("Error", "Image exceeded 1MB", "error");
    }

    setFile(file);
  };

  useEffect(() => {
    const fileReader = new FileReader();

    if (file) {
      fileReader.onloadend = () => {
        setFileUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      fileReader.abort();
    };
  }, [file]);

  return { file, fileUrl, handleFileChange };
};
export default useImageFile;
