import * as React from "react";
import { ActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { AgendamentoSearchForm } from "./AgendamentoSearchForm";
import { listAgendamentos } from "./agendamentoService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { BuscarAgendamentoDto } from "./agendamentoDto";
import { Button } from "@mui/material";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "paciente",
    headerName: "Paciente",
    flex: 1,
    valueGetter: (v) => {
      return v.row.paciente.nome;
    },
  },
  {
    field: "profissional",
    headerName: "Profissional",
    flex: 1,
    valueGetter: (v) => {
      return v.row.profissional.nome;
    },
  },
  {
    field: "marcacao",
    headerName: "Data da Consulta",
    flex: 1,
  },
  {
    field: "confirmado",
    headerName: "Confirmado?",
    flex: 1,
    valueGetter: (v) => {
      if (v.row.confirmado === true) {
        return "SIM";
      } else if (v.row.confirmado === false) {
        return "NÃO";
      }
      return "Não Confirmado";
    },
  },
];

const AgendamentoMain = () => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState([]);
  const loading = React.useContext(LoadingContext);

  const loadAgendamentos = (data: BuscarAgendamentoDto = {}) => {
    listAgendamentos(data).then((agendamentos) => {
      setRows(agendamentos);
    });
  };

  React.useEffect(() => {
    loadAgendamentos();
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
        <ActionBar>
          <Button>Novo Agendamento</Button>
          <Button disabled={selectedRow === null}>Solicitar Confirmação</Button>
          <Button disabled={selectedRow === null}>Confirmado Sim</Button>
          <Button disabled={selectedRow === null}>Confirmado Não</Button>
        </ActionBar>
      </>
    );
  }

  return (
    <MainModulePage
      result={renderResult()}
      searchForm={<AgendamentoSearchForm onSubmit={loadAgendamentos} />}
    />
  );
};

export { AgendamentoMain };
