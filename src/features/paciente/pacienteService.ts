import { request } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";

const createPaciente = (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  // date on ISO format

  console.log(paciente, "============================================");
};

const listPaciente = async () => {
  const { data } = await request.get("/pacientes");
  return data;
};

export { createPaciente, listPaciente };
