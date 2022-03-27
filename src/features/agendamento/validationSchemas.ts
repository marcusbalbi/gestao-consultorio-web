import { isFuture, parse } from "date-fns";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const AgendarValdationSchema = yup.object().shape({
  idPaciente: yup.string().label("Paciente").required(),
  idProfissional: yup.string().label("Profissional").required(),
  marcacao: yup.string().test((v, options) => {
    if (!v || !v.length) {
      return options.createError({
        message: "Data do Agendamento é obrigatório",
      });
    }
    // verificar se é futuro
    const [data] = v.split(" ");
    const dataObj = parse(data, "dd/MM/yyyy", new Date());

    if (!isFuture(dataObj)) {
      return options.createError({
        message: "Agendamento deve ser no futuro",
      });
    }

    return true;
  }),
});
