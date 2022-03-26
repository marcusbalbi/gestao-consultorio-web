export interface AgendarDto {
  idPaciente: string;
  idProfissional: string;
  marcacao: string;
}

export interface BuscarAgendamentoDto {
  cpfPaciente?: string;
  nomePaciente?: string;
  cpfProfissional?: string;
}
