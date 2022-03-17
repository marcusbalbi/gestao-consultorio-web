import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const CadsatrarProfissionalValidationSchema = yup.object().shape({
  nome: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .min(11, "cpf deve ter 11 caracteres (apenas números)")
    .max(11, "cpf deve ter 11 caracteres (apenas números)")
    .matches(/^\d+$/, "cpf deve conter apenas números"),
  tipo: yup.string().required(),
  senha: yup.string().required(),
});

export const AtualizarProfissionalValidationSchema = yup.object().shape({
  nome: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .min(11, "cpf deve ter 11 caracteres (apenas números)")
    .max(11, "cpf deve ter 11 caracteres (apenas números)")
    .matches(/^\d+$/, "cpf deve conter apenas números"),
  tipo: yup.string().required(),
  senha: yup.string(),
});
