import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { PacienteSearchForm } from "./PacienteSearchForm";
import { listPaciente } from "./pacienteService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "cpf",
    headerName: "Cpf",
    flex: 1,
  },
  {
    field: "dataNascimento",
    headerName: "Data de Nascimento",
    flex: 1,
  },
];

const PacienteMain = () => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState([]);
  const loading = React.useContext(LoadingContext);

  React.useEffect(() => {
    listPaciente().then((pacientes) => {
      setRows(pacientes);
    });
  }, []);
  function renderResult() {
    return (
      <>
        <ModuleDatagrid
          columns={columns}
          loading={loading}
          rows={rows}
          onSelectedRowChange={setSelectedRow}
        />
        <CrudActionBar
          createRoute="/paciente/cadastrar"
          updateRoute="/paciente/alterar"
          selectedRow={selectedRow}
          afterActions={renderAfterActions()}
        />
      </>
    );
  }
  function renderAfterActions() {
    return (
      <Button startIcon={<CalendarToday />} disabled={selectedRow == null}>
        Próximas Consultas
      </Button>
    );
  }

  return (
    <MainModulePage
      result={renderResult()}
      searchForm={<PacienteSearchForm />}
    />
  );
};

export { PacienteMain };
