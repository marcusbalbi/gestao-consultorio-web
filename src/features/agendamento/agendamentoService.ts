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
      console.log("AGENDAMENTO_SERVICE", `Falha ao Agendar paciente`, err);
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
  const { data } = await request.post(
    `agendamentos/enviar-email-confirmacao/${idAgendamento}`
  );

  return data;
};

const confirmarAgendamento = async (idAgendamento: string, status: boolean) => {
  const { data } = await request.get(`agendamentos/confirmar/`, {
    params: {
      id: idAgendamento,
      confirm: status === true ? 1 : 0,
    },
  });

  return data;
};

const listarAgendamentos = async (busca: BuscarAgendamentoDto = {}) => {
  const params = removeEmptyValues(busca);
  const { data } = await request.get("/agendamentos", {
    params,
  });
  return data;
};

export {
  agendar,
  listarAgendamentos,
  solicitarConfirmacao,
  confirmarAgendamento,
};
