import { Autocomplete, Grid, TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import { BaseForm } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";

import { AgendarDto } from "./agendamentoDto";
import { listarPaciente } from "../paciente/pacienteService";
import { CadastrarPacienteDto } from "../paciente/pacienteDto";
import { listarProfissional } from "../profissional/ProfissionalService";
import { CadastrarProfissionalDto } from "../profissional/ProfissionalDto";
import DatePicker from "@material-ui/lab/DatePicker";
import TimePicker from "@material-ui/lab/TimePicker";
import { format } from "date-fns";

interface AgendamentoFormProps {
  resolver: any;
  onSubmit?: any;
}

const AgendamentoForm = (props: AgendamentoFormProps) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty, errors },
  } = useForm<AgendarDto>({
    resolver: props.resolver,
  });
  const [pacientes, setPacientes] = React.useState([]);
  const [profissionais, setProfissionais] = React.useState([]);
  const [data, setData] = React.useState<string | null>("");
  const [hora, setHora] = React.useState<string | null>("");

  const onSubmit: SubmitHandler<AgendarDto> = (dados) => {
    props.onSubmit(dados);
  };

  React.useEffect(() => {
    // converter as duas datas
    try {
      if (data && hora) {
        const dataFormatada = format(new Date(data), "dd/MM/yyyy");
        const horaFormatada = format(new Date(hora), "HH:mm");
        setValue("marcacao", `${dataFormatada} ${horaFormatada}`);
      } else {
        setValue("marcacao", "");
      }
    } catch (err) {
      setValue("marcacao", "");
    }
  }, [data, hora, setValue]);

  React.useEffect(() => {
    listarPaciente().then((data) => {
      setPacientes(
        data.map((paciente: CadastrarPacienteDto) => {
          return {
            label: paciente.nome,
            id: paciente.id,
          };
        })
      );
    });

    listarProfissional().then((data) => {
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
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          onChange={(_, valor: any) => {
            setValue("idPaciente", valor?.id || "");
          }}
          isOptionEqualToValue={(c: any) => {
            return c.id === getValues().idPaciente;
          }}
          // inputValue={inputValue}
          disablePortal
          id="combo-paciente"
          options={pacientes}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Paciente"
              helperText={errors.idPaciente?.message}
              error={!!errors.idPaciente?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          isOptionEqualToValue={(c: any) => {
            return c.id === getValues().idProfissional;
          }}
          onChange={(_, novoValor: any) => {
            setValue("idProfissional", novoValor?.id || "");
          }}
          disablePortal
          id="combo-profissional"
          options={profissionais}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Profissional"
              helperText={errors.idProfissional?.message}
              error={!!errors.idProfissional?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label="Data do Agendamento"
          value={data}
          onChange={(newValue) => {
            setData(newValue);
          }}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...(params as TextFieldProps)}
              helperText={errors.marcacao?.message}
              error={!!errors.marcacao?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TimePicker
          label="Hora do Agendamento"
          value={hora}
          onChange={(newValue) => {
            setHora(newValue);
          }}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...(params as TextFieldProps)}
              helperText={errors.marcacao?.message}
              error={!!errors.marcacao?.message}
            />
          )}
        />
      </Grid>
    </BaseForm>
  );
};

export { AgendamentoForm };
