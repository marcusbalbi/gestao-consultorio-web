import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProfissionalSearchForm } from "./ProfissionalSearchForm";

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
  }
];

const rows = [
  { id: 1, nome: "Snow", documento: "00000000021" },
  { id: 2, nome: "Lannister", documento: "00000000021" },
  { id: 3, nome: "Lannister", documento: "00000000021" },
  { id: 4, nome: "Stark", documento: "00000000021" },
  { id: 5, nome: "Targaryen", documento: "00000000021" },
  { id: 6, nome: "Melisandre", documento: "00000000021" },
  { id: 7, nome: "Clifford", documento: "00000000021" },
  { id: 8, nome: "Frances", documento: "00000000021" },
  { id: 9, nome: "Roxie", documento: "00000000021" },
];

const ProfissionalMain = () => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
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
          createRoute="/profissional/cadastrar"
          updateRoute="/profissional/alterar"
          selectedRow={selectedRow}
        />
      </>
    );
  }
  function renderSearchForm() {
    return (
      <>
        <ProfissionalSearchForm />
      </>
    );
  }
  return (
    <>
      <MainModulePage result={renderResult()} searchForm={renderSearchForm()} />
    </>
  );
};

export { ProfissionalMain };