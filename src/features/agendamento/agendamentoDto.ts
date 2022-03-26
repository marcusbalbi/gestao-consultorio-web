export interface AgendarDto {
  idPaciente: string;
  idProfissional: string;
  marcacao: string;
}

export interface BuscarAgendamentoDto {
  nome?: string;
  cpf?: string;
  proximas?: boolean;
}
