import { isFuture, isMatch, parse } from "date-fns";
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
  dataNasciemnto: yup
    .string()
    .label("data de nascimento")
    .required()
    .test((v, options) => {
      if (
        !v ||
        !v.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
        !isMatch(v, "dd/MM/yyyy")
      ) {
        return options.createError({
          message: "Data de Nascimento deve estar no padrão dd/mm/aaaa",
        });
      }
      if (isFuture(parse(v, "dd/MM/yyyy", new Date()))) {
        return options.createError({
          message: "Data de Nascimento deve estar no passado",
        });
      }
      return true;
    }),
  logradouro: yup.string(),
  numero: yup.string(),
  cep: yup.string().test((v, options) => {
    if (!v || !v.length) {
      return true;
    }
    if (v.length !== 8 || !v.match(/^\d+$/)) {
      return options.createError({
        message: "Cep Deve ter 8 caracteres (apenas números)",
      });
    }
    return true;
  }),
  bairro: yup.string(),
  cidade: yup.string(),
  // estado: string;
  complemento: yup.string(),
  telefoneCelular: yup
    .string()
    .label("telefone celular")
    .required() // nao tem no back ainda,
    .test((v, options) => {
      if (!v || !v.match(/^\d+$/)) {
        return options.createError({
          message: "telefone celular deve conter apenas números",
        });
      }
      return true;
    }),
  email: yup.string().email(), // nao tem no back ainda
  telefoneContato: yup.string().test((v, options) => {
    if (!v || !v.length) {
      return true;
    }
    if (!v.match(/^\d+$/)) {
      return options.createError({
        message: "telefone para contato deve conter apenas números",
      });
    }
    return true;
  }), // nao tem no back ainda
});
