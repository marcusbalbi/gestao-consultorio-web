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

const data = [
  { name: "Acre", value: "AC" },
  { name: "Alagoas", value: "AL" },
  { name: "Amapá", value: "AP" },
  { name: "Amazonas", value: "AM" },
  { name: "Bahia", value: "BA" },
  { name: "Ceará", value: "CE" },
  { name: "Distrito Federal", value: "DF" },
  { name: "Espírito Santo", value: "ES" },
  { name: "Goiás", value: "GO" },
  { name: "Maranhão", value: "MA" },
  { name: "Mato Grosso", value: "MT" },
  { name: "Mato Grosso do Sul", value: "MS" },
  { name: "Minas Gerais", value: "MG" },
  { name: "Pará", value: "PA" },
  { name: "Paraíba", value: "PB" },
  { name: "Paraná", value: "PR" },
  { name: "Pernambuco", value: "PE" },
  { name: "Piauí", value: "PI" },
  { name: "Rio de Janeiro", value: "RJ" },
  { name: "Rio Grande do Norte", value: "RN" },
  { name: "Rio Grande do Sul", value: "RS" },
  { name: "Rondônia", value: "RO" },
  { name: "Roraima", value: "RR" },
  { name: "Santa Catarina", value: "SC" },
  { name: "São Paulo", value: "SP" },
  { name: "Sergipe", value: "SE" },
  { name: "Tocantins", value: "TO" },
];

interface UFSelectProps extends SelectProps {
  name: string;
  control: any;
  helperText?: string;
}

const UFSelect = (props: UFSelectProps) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel error={props.error} id="uf-select-label">
        {props.label || "UF"}
      </InputLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue || "" }
        render={({ field }) => {
          return (
            <Select
              MenuProps={{ style: { maxHeight: "300px" } }}
              {...field}
              error={props.error}
              labelId="uf-select-label"
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
      <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export { UFSelect };
