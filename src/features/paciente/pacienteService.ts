import { parseServerFormat, parseUIFormat, request } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";
import { cloneDeep, get } from "lodash";

const createPaciente = async (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parseServerFormat(parsedData.dataNascimento);
  const result = await request.post("/pacientes", parsedData).catch((err) => {
    console.log("PACIENTE_SERVICE", `Failed to Create Patient`, err);
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

const updatePaciente = async (id: string, paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parseServerFormat(parsedData.dataNascimento);
  const result = await request
    .put("/pacientes/".concat(id), parsedData)
    .catch((err) => {
      console.log("PACIENTE_SERVICE", `Failed to Update Patient`, err);
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

const listPaciente = async () => {
  const { data } = await request.get("/pacientes");
  data.forEach((paciente: CadastrarPacienteDto) => {
    paciente.dataNascimento = parseUIFormat(paciente.dataNascimento);
  });
  return data;
};

const findPatient = async (id: string) => {
  const { data } = await request.get("/pacientes/".concat(id));
  data.dataNascimento = parseUIFormat(data.dataNascimento);
  return data;
};

export { createPaciente, listPaciente, findPatient, updatePaciente };
