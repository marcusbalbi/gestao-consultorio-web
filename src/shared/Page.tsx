import { Paper, Typography } from "@mui/material";
import * as React from "react";

interface Props extends React.PropsWithChildren<any> {
  title?: string;
}

const Page = (props: Props) => {
  const renderTitle = () => {
    if (props.title) {
      return (
        <Typography variant="h4" align="center">
          {props.title}
        </Typography>
      );
    }
  };
  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
        margin: (theme) => theme.spacing(4),
      }}
    >
      {renderTitle()}
      {props.children}
    </Paper>
  );
};

export { Page };
