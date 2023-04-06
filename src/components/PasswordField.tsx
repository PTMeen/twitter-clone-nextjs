import { ChangeEvent, useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";

interface Props {
  id?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({ placeholder, name, value, id, onChange }: Props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((prev) => !prev);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      <InputRightElement>
        <IconButton
          size="sm"
          onClick={handleClick}
          aria-label={show ? "show password" : "hide password"}
          icon={show ? <BiHide /> : <BiShow />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
export default PasswordField;
