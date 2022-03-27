import * as React from "react";
import { CrudActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { ProfissionalBuscaForm } from "./ProfissionalBuscaForm";
import { listarProfissional, removerProfissional } from "./ProfissionalService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { BuscarProfissionalDto } from "./ProfissionalDto";
import { useToast } from "../../hooks/toast";

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
  const { addToast } = useToast();

  const carregarProfissionais = (data: BuscarProfissionalDto = {}) => {
    listarProfissional(data).then((profissionais) => {
      setRows(profissionais);
    });
  };

  const handleRemove = () => {
    removerProfissional(selectedRow || "")
      .then(() => {
        carregarProfissionais();
        addToast({
          title: "Profissional removido!",
        });
      })
      .catch(() => {
        addToast({
          title:
            "Erro ao Remover Profissional, confira se o mesmo já não foi removido ou tente novamente",
        });
      });
  };

  React.useEffect(() => {
    carregarProfissionais();
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
          removeAction={handleRemove}
        />
      </>
    );
  }
  return (
    <>
      <MainModulePage
        result={renderResult()}
        searchForm={<ProfissionalBuscaForm onSubmit={carregarProfissionais} />}
      />
    </>
  );
};

export { ProfissionalMain };
