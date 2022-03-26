import { Autocomplete, Grid, TextField } from "@mui/material";
import * as React from "react";
import { BaseForm } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";

import { AgendarDto } from "./agendamentoDto";
import { listPaciente } from "../paciente/pacienteService";
import { CadastrarPacienteDto } from "../paciente/pacienteDto";
import { listProfissional } from "../profissional/ProfissionalService";
import { CadastrarProfissionalDto } from "../profissional/ProfissionalDto";

interface AgendamentoFormProps {
  resolver: any;
  onSubmit?: any;
}

const AgendamentoForm = (props: AgendamentoFormProps) => {
  const {
    handleSubmit,
    formState: { isDirty },
  } = useForm<AgendarDto>({
    resolver: props.resolver,
  });
  const [pacientes, setPacientes] = React.useState([]);
  const [profissionais, setProfissionais] = React.useState([]);
  const onSubmit: SubmitHandler<AgendarDto> = (data) => {
    props.onSubmit(data);
  };

  React.useEffect(() => {
    listPaciente().then((data) => {
      setPacientes(
        data.map((paciente: CadastrarPacienteDto) => {
          return {
            label: paciente.nome,
            id: paciente.id,
          };
        })
      );
    });

    listProfissional().then((data) => {
      setProfissionais(
        data.map((profissional: CadastrarProfissionalDto) => {
          return {
            label: profissional.nome,
            id: profissional.id,
          };
        })
      );
    });

  }, []);

  return (
    <BaseForm
      actionText="Agendar"
      isDirty={isDirty}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12} md={4}>
        <Autocomplete
          fullWidth
          disablePortal
          id="combo-paciente"
          options={pacientes}
          renderInput={(params) => <TextField {...params} label="Paciente" />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Autocomplete
          fullWidth
          disablePortal
          id="combo-profissional"
          options={profissionais}
          renderInput={(params) => <TextField {...params} label="Profissional" />}
        />
      </Grid>
    </BaseForm>
  );
};

export { AgendamentoForm };
