import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";

interface Props extends React.PropsWithChildren<any> {
  title?: string;
}

interface MainPageProps extends React.PropsWithChildren<any> {
  searchForm?: JSX.Element;
  result: JSX.Element;
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

const MainModulePage = (props: MainPageProps) => {
  const renderSearchForm = () => {
    return (
      props.searchForm && (
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: (theme) => theme.spacing(2), height: "100%" }}>
            {props.searchForm}
          </Paper>
        </Grid>
      )
    );
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: (theme) => theme.spacing(4),
      }}
    >
      {renderSearchForm()}
      <Grid item xs={12} md={props.searchForm ? 8 : 12}>
        <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
          {props.result}
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Page, MainModulePage };
