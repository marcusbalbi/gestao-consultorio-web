export interface Telefone {
  ddd: string;
  telefone: string;
}

export interface CadastrarPacienteDto {
  nome: string;
  cpf: string;
  dataNasciemnto: string;
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
  telefone: Telefone; // nao tem no back ainda
  email: string; // nao tem no back ainda
  telefoneContato: string; // nao tem no back ainda
}
