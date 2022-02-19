import * as React from "react";
import { Page } from "../../shared";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Add, CalendarToday, Edit, Remove } from "@mui/icons-material";

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
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  function renderDatagrid() {
    return (
      <div style={{ display: "flex", height: 400 }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
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
    );
  }
  function renderActionBar() {
    return (
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup
          variant="text"
          size="small"
          aria-label="outlined button group"
        >
          <Button
            startIcon={<Add />}
            onClick={() => navigate("/paciente/cadastrar")}
          >
            Cadastrar
          </Button>
          <Button startIcon={<Edit />} disabled={selectedRow == null}>
            Alterar
          </Button>
          <Button startIcon={<Remove />} disabled={selectedRow == null}>
            Excluir
          </Button>
          <Button startIcon={<CalendarToday />} disabled={selectedRow == null}>
            Próximas Consultas
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
  return (
    <Page>
      {renderDatagrid()}
      {renderActionBar()}
    </Page>
  );
};

export { PacienteMain };

// pagina principal de pacientes

// daqui pode-se buscar, ir para rota de cadastro, ir para rota de edicao, ir para rota de agendamentos do paciente
