import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const CadastrarPacienteValdationSchema = yup.object().shape({
  nome: yup.string().required(),
  cpf: yup
    .string()
    .min(11, "cpf deve ter 11 caracteres (apenas números)")
    .max(11, "cpf deve ter 11 caracteres (apenas números)")
    .matches(/^\d+$/, "cpf deve conter apenas números")
    .required(),
  dataNasciemnto: yup.string().label("Data de Nascimento").required(),
  // logradouro: string;
  // numero: string;
  // cep: string;
  // bairro: string;
  // cidade: string;
  // estado: string;
  // complemento: string;
  // telefoneCelular: string; // nao tem no back ainda
  // email: string; // nao tem no back ainda
  // telefoneContato: string; // nao tem no back ainda
});
