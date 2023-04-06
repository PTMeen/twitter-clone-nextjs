import * as Yup from "yup";

const registerSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("email equired"),
  name: Yup.string().required("name required"),
  username: Yup.string().required("name required"),
  password: Yup.string().required("password required").min(3).max(20),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("email equired"),
  password: Yup.string().required("password required").min(3).max(20),
});

export { registerSchema, loginSchema };
