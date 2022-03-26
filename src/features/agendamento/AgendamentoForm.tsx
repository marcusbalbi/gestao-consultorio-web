import { Autocomplete, Grid, TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import { BaseForm } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";

import { AgendarDto } from "./agendamentoDto";
import { listPaciente } from "../paciente/pacienteService";
import { CadastrarPacienteDto } from "../paciente/pacienteDto";
import { listProfissional } from "../profissional/ProfissionalService";
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
  const [date, setDate] = React.useState<string | null>("");
  const [time, setTime] = React.useState<string | null>("");

  const onSubmit: SubmitHandler<AgendarDto> = (data) => {
    props.onSubmit(data);
  };

  React.useEffect(() => {
    // converter as duas datas
    try {
      if (date && time) {
        const formattedDate = format(new Date(date), "dd/MM/yyyy");
        const formattedTime = format(new Date(time), "HH:mm");
        setValue("marcacao", `${formattedDate} ${formattedTime}`);
      } else {
        setValue("marcacao", "");
      }
    } catch (err) {
      setValue("marcacao", "");
    }
  }, [date, time, setValue]);

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
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          onChange={(event: any, newValue: any) => {
            setValue("idPaciente", newValue?.id || "");
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
          onChange={(event: any, newValue: any) => {
            setValue("idProfissional", newValue?.id || "");
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
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
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
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
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
