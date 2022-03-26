import { AgendarDto, BuscarAgendamentoDto } from "./agendamentoDto";
import { cloneDeep, get } from "lodash";
import { request } from "../../shared/request";

const agendar = async (dadosAgendamento: AgendarDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(dadosAgendamento);
  const result = await request.post("/agendamentos", parsedData).catch((err) => {
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

const listAgendamentos = async (busca: BuscarAgendamentoDto = {}) => {
  const { data } = await request.get("/agendamentos", {
    params: busca,
  });
  // data.forEach((agendamento: AgendarDto) => {
  //   agendamento.marcacao = parseUIFormat(agendamento.marcacao);
  // });
  return data;
};

export { agendar, listAgendamentos };
