import { BuscarPacienteDto, CadastrarPacienteDto } from "./pacienteDto";
import { cloneDeep, get } from "lodash";
import { removeEmptyValues } from "../../shared/utils/objects";
import { parseServerFormat, parseUIFormat } from "../../shared/utils";
import { request } from "../../shared/request";

const criarPaciente = async (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parseServerFormat(parsedData.dataNascimento);
  const result = await request.post("/pacientes", parsedData).catch((err) => {
    console.log("PACIENTE_SERVICE", `Falha ao cadastrar paciente`, err);
    throw new Error(
      `Falha ao cadastrar paciente: ${get(
        err,
        "response.data.message",
        "Erro não Identificado"
      )}`
    );
  });

  return result;
};

const alterarPaciente = async (id: string, paciente: CadastrarPacienteDto) => {
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parseServerFormat(parsedData.dataNascimento);
  const result = await request
    .put("/pacientes/".concat(id), parsedData)
    .catch((err: any) => {
      console.log("PACIENTE_SERVICE", `Falha ao alterar paciente`, err);
      throw new Error(
        `Falha ao alterar paciente: ${get(
          err,
          "response.data.message",
          "Erro não Identificado"
        )}`
      );
    });

  return result;
};

const listarPaciente = async (busca: BuscarPacienteDto = {}) => {
  const params = removeEmptyValues(busca);
  const { data } = await request.get("/pacientes", {
    params,
  });
  data.forEach((paciente: CadastrarPacienteDto) => {
    paciente.dataNascimento = parseUIFormat(paciente.dataNascimento);
  });
  return data;
};

const encontrarPaciente = async (id: string) => {
  const { data } = await request.get("/pacientes/".concat(id));
  data.dataNascimento = parseUIFormat(data.dataNascimento);
  return data;
};

const removerPaciente = async (id: string) => {
  const response = await request.delete("/pacientes/".concat(id));
  return response;
};

export {
  criarPaciente,
  listarPaciente,
  encontrarPaciente,
  alterarPaciente,
  removerPaciente,
};
