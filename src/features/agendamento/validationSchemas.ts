// import { isFuture, isMatch, parse } from "date-fns";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const AgendarValdationSchema = yup.object().shape({
  nome: yup.string().required(),
  idPaciente: yup.string().required(),
  idProfissional: yup.string().required(),
  marcacao: yup
    .string()
    .required()
    .test((v, options) => {
      if (!v || !v.length) {
        return true;
      }
      return true;
    }),
});
