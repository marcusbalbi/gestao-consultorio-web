import { request } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";

const createPaciente = (paciente: CadastrarPacienteDto) => {
  // prepare data to be sent:
  const parsedData  = paciente;
  request.post("/pacientes", parsedData);

  console.log(paciente, "============================================");
};

const listPaciente = async () => {
  const { data } = await request.get("/pacientes");
  return data;
};

export { createPaciente, listPaciente };
