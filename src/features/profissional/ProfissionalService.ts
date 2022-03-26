import { request } from "../../shared";
import { BuscarProfissionalDto, CadastrarProfissionalDto } from "./ProfissionalDto";
import { cloneDeep, get } from "lodash";

const createProfissional = async (profissional: CadastrarProfissionalDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(profissional);
  const result = await request.post("/profissionais", parsedData).catch((err) => {
    console.log("PROFISSIONAIS_SERVICE", `Failed to Create Profissional`, err);
    throw new Error(
      `Falha ao cadastrar profissional: ${get(
        err,
        "response.data.message",
        "Erro não Identificado"
      )}`
    );
  });

  return result;
};

const updateProfissional = async (id: string, profissional: CadastrarProfissionalDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(profissional);
  const result = await request
    .put("/profissionais/".concat(id), parsedData)
    .catch((err) => {
      console.log("PROFISSIONAIS_SERVICE", `Failed to Update Profissional`, err);
      throw new Error(
        `Falha ao alterar profissional: ${get(
          err,
          "response.data.message",
          "Erro não Identificado"
        )}`
      );
    });

  return result;
};

const listProfissional = async (busca: BuscarProfissionalDto = {}) => {
  const { data } = await request.get("/profissionais", {
    params: busca,
  });
  return data;
};

const findProfissional = async (id: string) => {
  const { data } = await request.get("/profissionais/".concat(id));
  return data;
};

const removeProfissional = async (id: string) => {
  const response = await request.delete("/profissionais/".concat(id));
  return response;
};

export {
  createProfissional,
  listProfissional,
  findProfissional,
  updateProfissional,
  removeProfissional,
};
