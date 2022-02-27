import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const CadastrarPacienteValdationSchema = yup.object().shape({
  nome: yup.string().required(),
  cpf: yup
    .string()
    .min(11)
    .max(11)
    .required(),
  dataNasciemnto: yup.string().required(),
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
