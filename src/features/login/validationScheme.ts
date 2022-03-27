import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);

export const loginValidation = yup.object().shape({
  username: yup
    .string()
    .required("CPF é obrigatório"),
  password: yup
    .string()
    .required("A senha não está válida"),
});
