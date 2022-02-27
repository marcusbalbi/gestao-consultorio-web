import { ButtonGroup, ButtonGroupProps } from '@mui/material'
import * as React from 'react'


interface ActionBarProps extends ButtonGroupProps {}

export const ActionBar = (props: ActionBarProps) => {
  return (
    <ButtonGroup
      variant="text"
      sx={{ display: "flex", justifyContent: "flex-end" }}
      {...props}
    >
      {props.children}
    </ButtonGroup>
  );
};
