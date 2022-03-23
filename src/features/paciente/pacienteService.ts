import { request } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";
import { cloneDeep, get } from "lodash";
import { parse } from "date-fns";

const createPaciente = async (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parse(
    parsedData.dataNascimento,
    "dd/MM/yyyy",
    new Date()
  ).toISOString();
  const result = await request.post("/pacientes", parsedData).catch((err) => {
    console.log("PACIENTE_SERVICE", `Failed to Create Patient`, err);
    throw new Error(
      `Falha ao cadastrar paciente: ${get(err, 'response.data.message', 'Erro não Identificado')}`
    );
  });

  return result;
};

const listPaciente = async () => {
  const { data } = await request.get("/pacientes");
  return data;
};

export { createPaciente, listPaciente };
