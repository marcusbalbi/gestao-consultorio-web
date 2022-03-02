import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import * as React from "react";

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
  useCompleteName?: boolean;
}

const UFSelect = React.forwardRef((props: UFSelectProps, ref) => {
  const getProps = () => {
    return {
      label: "UF",
      ...props,
    };
  };
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel id="uf-select-label">{props.label}</InputLabel>
      <Select
        labelId="uf-select-label"
        MenuProps={{ style: { maxHeight: "300px" } }}
        ref={ref}
        {...getProps()}
      >
        <MenuItem key="empty" value={undefined}>
          Selecione
        </MenuItem>
        {data.map((uf) => {
          return (
            <MenuItem key={uf.value} value={uf.value}>
              {props.useCompleteName ? uf.name : uf.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
});

export { UFSelect };
