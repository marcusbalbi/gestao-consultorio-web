import { AgendarDto, BuscarAgendamentoDto } from "./agendamentoDto";
import { cloneDeep, get } from "lodash";
import { parseServerFormat, parseUIFormat } from "../../shared/utils";
import { request } from "../../shared/request";

const agendar = async (dadosAgendamento: AgendarDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(dadosAgendamento);
  parsedData.marcacao = parseServerFormat(parsedData.marcacao);
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
  const { data } = await request.get("/pacientes", {
    params: busca,
  });
  data.forEach((agendamento: AgendarDto) => {
    agendamento.marcacao = parseUIFormat(agendamento.marcacao);
  });
  return data;
};

export { agendar, listAgendamentos };
