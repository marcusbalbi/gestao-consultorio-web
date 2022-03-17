import { requestAuth } from "../../shared";
import { CadastrarProfissionalDto } from "./ProfissionalDto";

const createProfissional = (profissional: CadastrarProfissionalDto) => {
  console.log(profissional, "============================================");
};

const listProfissional = async () => {
  const { data } = await requestAuth.get("/profissionais");
  return data;
};

export { createProfissional, listProfissional };
