import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import * as React from "react";
import { Controller } from "react-hook-form";
import { TipoProfissinal } from "./ProfissionalDto";

const data = [
  { name: "Médico", value: TipoProfissinal.MEDICO },
  { name: "Dentista", value: TipoProfissinal.DENTISTA },
  { name: "Psicologo", value: TipoProfissinal.PSICOLOGO },
  { name: "Atendente", value: TipoProfissinal.ATENDENTE },
];

interface TipoProfissionalSelectProps extends SelectProps {
  name: string;
  control: any;
  helperText?: string;
}

const TipoProfissionalSelect2 = (props: TipoProfissionalSelectProps) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel error={props.error} id="tipo-profissional-select-label">
        {props.label || "Tipo Profissional"}
      </InputLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={""}
        render={({ field }) => {
          return (
            <Select
              MenuProps={{ style: { maxHeight: "300px" } }}
              {...field}
              error={props.error}
              // labelId="tipo-profissional-select-label"
            >
              <MenuItem key="empty" value={""}>
                Selecione
              </MenuItem>
              {data.map((data) => {
                return (
                  <MenuItem key={data.name} value={data.value}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          );
        }}
      />
      <FormHelperText error={props.error}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export { TipoProfissionalSelect2 };
