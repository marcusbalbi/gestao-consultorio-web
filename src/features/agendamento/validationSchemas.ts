import { isFuture, parse } from "date-fns";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
yup.setLocale(pt);
export const AgendarValdationSchema = yup.object().shape({
  idPaciente: yup.string().label("Paciente").required(),
  idProfissional: yup.string().label("Profissional").required(),
  marcacao: yup.string().test((v, options) => {
    console.log(v);
    if (!v || !v.length) {
      return options.createError({
        message: "Data do Agendamento é obrigatório",
      });
    }
    // verificar se é futuro
    const [date] = v.split(" ");
    const dateObj = parse(date, "dd/MM/yyyy", new Date());

    if (!isFuture(dateObj)) {
      return options.createError({
        message: "Agendamento deve ser no futuro",
      });
    }

    return true;
  }),
});
