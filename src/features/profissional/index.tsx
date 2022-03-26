import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { ProfissionalSearchForm } from "./ProfissionalSearchForm";
import { listProfissional } from "./ProfissionalService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { BuscarProfissionalDto } from "./ProfissionalDto";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "cpf",
    headerName: "Documento",
    flex: 1,
  },
  {
    field: "atuacao",
    headerName: "Tipo",
    flex: 1,
  },
];

const ProfissionalMain = () => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState([]);
  const loading = React.useContext(LoadingContext);

  const searchProfissionais = (data: BuscarProfissionalDto) => {
    listProfissional(data).then((profissionais) => {
      setRows(profissionais);
    });
  };

  React.useEffect(() => {
    listProfissional().then((profissionais) => {
      setRows(profissionais);
    });
  }, []);
  function renderResult() {
    return (
      <>
        <ModuleDatagrid
          rows={rows}
          columns={columns}
          loading={loading}
          onSelectedRowChange={setSelectedRow}
        />
        <CrudActionBar
          createRoute="/profissional/cadastrar"
          updateRoute="/profissional/alterar"
          selectedRow={selectedRow}
        />
      </>
    );
  }
  return (
    <>
      <MainModulePage
        result={renderResult()}
        searchForm={<ProfissionalSearchForm onSubmit={searchProfissionais} />}
      />
    </>
  );
};

export { ProfissionalMain };
