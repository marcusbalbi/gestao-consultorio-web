import {
  BuscarProfissionalDto,
  CadastrarProfissionalDto,
} from "./ProfissionalDto";
import { cloneDeep, get } from "lodash";
import { removeEmptyValues } from "../../shared/utils/objects";
import { request } from "../../shared/request";

const criarProfissional = async (profissional: CadastrarProfissionalDto) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(profissional);
  const result = await request
    .post("/profissionais", parsedData)
    .catch((err) => {
      console.log(
        "PROFISSIONAIS_SERVICE",
        `Failed to Create Profissional`,
        err
      );
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

const alterarProfissional = async (
  id: string,
  profissional: CadastrarProfissionalDto
) => {
  // prepare data to be sent:
  const parsedData = cloneDeep(profissional);
  const result = await request
    .put("/profissionais/".concat(id), parsedData)
    .catch((err: any) => {
      console.log(
        "PROFISSIONAIS_SERVICE",
        `Failed to Update Profissional`,
        err
      );
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

const listarProfissional = async (busca: BuscarProfissionalDto = {}) => {
  const params = removeEmptyValues(busca);
  const { data } = await request.get("/profissionais", {
    params,
  });
  return data;
};

const encontrarProfissional = async (id: string) => {
  const { data } = await request.get("/profissionais/".concat(id));
  return data;
};

const removerProfissional = async (id: string) => {
  const response = await request.delete("/profissionais/".concat(id));
  return response;
};

export {
  criarProfissional,
  listarProfissional,
  encontrarProfissional,
  alterarProfissional,
  removerProfissional,
};
