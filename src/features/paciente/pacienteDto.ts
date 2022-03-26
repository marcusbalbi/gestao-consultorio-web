export interface Telefone {
  ddd: string;
  telefone: string;
}

export interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  numero: string;
}

export interface CadastrarPacienteDto {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
  telefone: Telefone;
  email: string;
  telefoneContato: string;
}

export interface BuscarPacienteDto {
  nome?: string;
  cpf?: string;
}
