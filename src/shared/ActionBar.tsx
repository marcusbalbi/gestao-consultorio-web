import { Button, ButtonGroup, ButtonGroupProps } from "@mui/material";
import * as React from "react";
import { Add, Edit, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "@material-ui/core";

interface ActionBarProps extends ButtonGroupProps {}

interface CrudActionBarProps extends ActionBarProps {
  selectedRow?: any;
  createRoute?: string;
  updateRoute?: string;
  afterActions?: any;
  removeAction?: any;
}

export const ActionBar = (props: ActionBarProps) => {
  const getSxProps = () => {
    return {
      ...(props.sx || {}),
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: { xs: "column", md: "row" },
    };
  };
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

export const CrudActionBar = (props: CrudActionBarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <ActionBar variant="text" size="small" sx={{ mt: 2 }}>
      <Button
        startIcon={<Add />}
        onClick={() => props.createRoute && navigate(`${props.createRoute}`)}
      >
        Cadastrar
      </Button>
      <Button
        startIcon={<Edit />}
        onClick={() =>
          props.updateRoute &&
          navigate(`${props.updateRoute}/${props.selectedRow}`)
        }
        disabled={!props.selectedRow}
      >
        Alterar
      </Button>
      <Button
        startIcon={<Remove />}
        disabled={!props.selectedRow}
        onClick={() => {
          Swal.fire({
            title: "Tem certeza?",
            text: "Tem certeza que deseja remover esse registro ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: theme.palette.error.dark,
            cancelButtonColor: theme.palette.primary.main,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          }).then((result) => {
            if (result.isConfirmed) {
              props.removeAction && props.removeAction(props.selectedRow);
            }
          });
        }}
      >
        Excluir
      </Button>
      {props.afterActions}
    </ActionBar>
  );
};
