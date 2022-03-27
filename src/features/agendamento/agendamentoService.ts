import { AgendarDto, BuscarAgendamentoDto } from "./agendamentoDto";
import { cloneDeep, get } from "lodash";
import { request } from "../../shared/request";
import { removeEmptyValues } from "../../shared/utils/objects";

const agendar = async (dadosAgendamento: AgendarDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(dadosAgendamento);
  const result = await request
    .post("/agendamentos", parsedData)
    .catch((err) => {
      console.log("AGENDAMENTO_SERVICE", `Failed to Schedule Patient`, err);
      throw new Error(
        `Falha ao agendar: ${get(
          err,
          "response.data.message",
          "Erro não Identificado"
        )}`
      );
    });

  return result;
};

const solicitarConfirmacao = async (idAgendamento: string) => {
  const { data } = await request.post(`agendamentos/enviar-email-confirmacao/${idAgendamento}`);

  return data;
};

const listAgendamentos = async (busca: BuscarAgendamentoDto = {}) => {
  const params = removeEmptyValues(busca);
  const { data } = await request.get("/agendamentos", {
    params,
  });
  return data;
};

export { agendar, listAgendamentos, solicitarConfirmacao };
