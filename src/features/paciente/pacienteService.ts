import { request } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";
import { cloneDeep } from "lodash";
import { parse } from "date-fns";

const createPaciente = async (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(paciente);
  parsedData.dataNascimento = parse(
    parsedData.dataNascimento,
    "dd/MM/yyyy",
    new Date()
  ).toISOString();
  const result = await request.post("/pacientes", parsedData);

  console.log(result, "============================================");
};

const listPaciente = async () => {
  const { data } = await request.get("/pacientes");
  return data;
};

export { createPaciente, listPaciente };
