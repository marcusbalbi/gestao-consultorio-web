export enum TipoProfissinal {
  MEDICO = 1,
  DENTISTA = 2,
  PSICOLOGO = 3,
  ATENDENTE = 4, // acho que ficou faltando no backend
}

export interface CadastrarProfissionalDto {
  nome: string;
  cpf: string; // loga com cpf?
  tipoProfissional: TipoProfissinal;
  senha: string;
}

export interface BuscarProfissionalDto {
  nome?: string;
  cpf?: string;
  tipoProfissional?: TipoProfissinal;
}
