import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { PacienteSearchForm } from "./PacienteSearchForm";
import { listPaciente, removePatient } from "./pacienteService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { useToast } from "../../hooks/toast";
import { BuscarPacienteDto } from "./pacienteDto";
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
  const { addToast } = useToast();

  const loadPatients = () => {
    listPaciente().then((pacientes) => {
      setRows(pacientes);
    });
  };

  const searchPatients = (data: BuscarPacienteDto) => {
    console.log(data,  'to aqui');
  };

  const handleRemove = (id: string) => {
    console.log("remove ele!", id);
    removePatient(id)
      .then(() => {
        loadPatients();
        addToast({
          title: "Paciente removido!",
        });
      })
      .catch(() => {
        addToast({
          title:
            "Erro ao Remover paciente, confira se o mesmo já não foi removido ou tente novamente",
        });
      });
  };

  React.useEffect(() => {
    loadPatients();
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
          removeAction={handleRemove}
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
      searchForm={<PacienteSearchForm onSubmit={searchPatients} />}
    />
  );
};

export { PacienteMain };
