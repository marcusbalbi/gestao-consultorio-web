import { ButtonGroup, ButtonGroupProps } from '@mui/material'
import * as React from 'react'


interface ActionBarProps extends ButtonGroupProps {}

export const ActionBar = (props: ActionBarProps) => {
  const getSxProps = () => {
    return {
      ...(props.sx || {}),
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: { xs: "column", md: "row" },
    };
  }
  return (
    <ButtonGroup
      variant="text"
      {...props}
      sx={getSxProps()}
      aria-label="outlined button group"
    >
      {props.children}
    </ButtonGroup>
  );
};
