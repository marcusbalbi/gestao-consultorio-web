import * as React from "react";
import { ActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { AgendamentoSearchForm } from "./AgendamentoSearchForm";
import { listAgendamentos } from "./agendamentoService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { AgendarDto, BuscarAgendamentoDto } from "./agendamentoDto";
import { Button } from "@mui/material";
import { isPast, parse } from "date-fns";
import { useToast } from "../../hooks/toast";

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
      return `${v.row.profissional.nome} - ${v.row.profissional.atuacao}`;
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
  const { addToast } = useToast();

  const loadAgendamentos = (data: BuscarAgendamentoDto = {}) => {
    listAgendamentos(data).then((agendamentos) => {
      setRows(agendamentos);
    });
  };

  const validateAction = () => {
    if (selectedRow === null) {
      return false;
    }
    const row: any = rows.find((r: any) => r.id === selectedRow);

    const date = parse(row.marcacao, "dd/MM/yyyy HH:mm", new Date());

    if (isPast(date)) {
      return false;
    }

    return true;
  };

  const handleSolicitarConfirmacao = () => {
    if (validateAction() === false) {
      addToast({
        title:
          "Falha ao Solicitar Confirmação, verifique se a linha está selecionada e o agendamento é futuro",
        type: "error",
        options: {
          autoHideDuration: 5000,
        },
      });
    }
    // call service solicitar confirmacao
  };

  const handleConfirmar = (confirmado: boolean) => {
    if (validateAction() === false) {
      addToast({
        title:
          "Falha ao Confirmar, verifique se a linha está selecionada e o agendamento é futuro",
        type: "error",
        options: {
          autoHideDuration: 5000,
        },
      });
    }

    // call service confirmar with variable

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
          <Button
            disabled={selectedRow === null}
            onClick={handleSolicitarConfirmacao}
          >
            Solicitar Confirmação
          </Button>
          <Button
            disabled={selectedRow === null}
            onClick={() => {
              handleConfirmar(true);
            }}
          >
            Confirmado Sim
          </Button>
          <Button
            disabled={selectedRow === null}
            onClick={() => {
              handleConfirmar(false);
            }}
          >
            Confirmado Não
          </Button>
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
