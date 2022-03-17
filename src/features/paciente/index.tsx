import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { PacienteSearchForm } from "./PacienteSearchForm";
import { listPaciente } from "./pacienteService";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "documento",
    headerName: "Documento",
    flex: 1,
  },
  {
    field: "idade",
    headerName: "Idade",
    flex: 1,
  },
  {
    field: "proxima_consulta",
    headerName: "Próxima Consulta",
    flex: 1,
  },
];

const rows = [
  { id: 1, nome: "Snow", idade: 35, documento: "00000000021" },
  { id: 2, nome: "Lannister", idade: 42, documento: "00000000021" },
  { id: 3, nome: "Lannister", idade: 45, documento: "00000000021" },
  { id: 4, nome: "Stark", idade: 16, documento: "00000000021" },
  { id: 5, nome: "Targaryen", idade: 50, documento: "00000000021" },
  { id: 6, nome: "Melisandre", idade: 150, documento: "00000000021" },
  { id: 7, nome: "Clifford", idade: 44, documento: "00000000021" },
  { id: 8, nome: "Frances", idade: 36, documento: "00000000021" },
  { id: 9, nome: "Roxie", idade: 65, documento: "00000000021" },
];

const PacienteMain = () => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  React.useEffect(() => {
    listPaciente().then((pacientes) => {
      console.log(pacientes);
    });
  }, []);
  function renderResult() {
    return (
      <>
        <div style={{ display: "flex", height: 400 }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              disableColumnMenu
              hideFooterSelectedRowCount
              onSelectionModelChange={(r) => {
                setSelectedRow(r.length ? r[0].toString() : null);
              }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
            />
          </div>
        </div>
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
  function renderSearchForm() {
    return <PacienteSearchForm />;
  }
  return (
    <>
      <MainModulePage result={renderResult()} searchForm={renderSearchForm()} />
    </>
  );
};

export { PacienteMain };

// pagina principal de pacientes

// daqui pode-se buscar, ir para rota de cadastro, ir para rota de edicao, ir para rota de agendamentos do paciente
