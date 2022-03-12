import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import * as React from "react";

const data = [
  { name: "Médico", value: 1 },
  { name: "Dentista", value: 2 },
  { name: "Psicologo", value: 2 },
  { name: "Atendente", value: 4 },
];

interface TipoProfissionalSelectProps extends SelectProps {
  clean: any;
}

const TipoProfissionalSelect = React.forwardRef(
  (props: TipoProfissionalSelectProps, ref) => {
    return (
      <FormControl fullWidth={props.fullWidth}>
        <InputLabel id="tipo-profissional-select-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="tipo-profissional-select-label"
          MenuProps={{ style: { maxHeight: "300px" } }}
          inputRef={ref}
          {...props}
          onChange={(e) => {
            props.clean(ref);
          }}
        >
          <MenuItem key="empty" value={undefined}>
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
      </FormControl>
    );
  }
);

export { TipoProfissionalSelect };
