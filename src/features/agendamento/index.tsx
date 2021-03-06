import * as React from "react";
import { ActionBar, MainModulePage } from "../../shared";
import { GridColDef } from "@mui/x-data-grid";
import { AgendamentoSearchForm } from "./AgendamentoSearchForm";
import {
  confirmarAgendamento,
  listAgendamentos,
  solicitarConfirmacao,
  cancelarAgendamento,
} from "./agendamentoService";
import { ModuleDatagrid } from "../../shared/Datagrid";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { BuscarAgendamentoDto } from "./agendamentoDto";
import { Button } from "@mui/material";
import { isPast, parse } from "date-fns";
import { useToast } from "../../hooks/toast";
import { useNavigate } from "react-router-dom";

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
      return `${v.row.profissional.nome} - ${v.row.profissional.atuacao.descricao}`;
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
  const [filtro, setFiltro] = React.useState<BuscarAgendamentoDto>({
    proximas: true,
  });
  const loading = React.useContext(LoadingContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const loadAgendamentos = (data: BuscarAgendamentoDto) => {
    listAgendamentos(data).then((agendamentos) => {
      setRows(agendamentos);
    });
  };

  const gravarFiltro = (filtro: BuscarAgendamentoDto) => {
    setFiltro(filtro);
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
      return;
    }
    // call service solicitar confirmacao
    solicitarConfirmacao(selectedRow || "")
      .then(() => {
        addToast({
          type: "success",
          title:
            "Solicitação de Confirmação enviada com sucesso, caso o paciente confirme, o status será atualizado automaticamente para Confirmado",
        });
      })
      .catch((err) => {
        addToast({
          type: "error",
          title:
            "Falha ao solicitar confirmação do agendamento: " + err.message,
        });
      });
  };

  const handleConfirmar = async () => {
    if (validateAction() === false) {
      addToast({
        title:
          "Falha ao Confirmar, verifique se a linha está selecionada e o agendamento é futuro",
        type: "error",
        options: {
          autoHideDuration: 5000,
        },
      });
      return;
    }

    const data = await confirmarAgendamento(selectedRow || "").catch((err) => {
      addToast({
        type: "error",
        title: "Falha ao confirmar agendamento: " + err.message,
      });
    });
    if (data) {
      addToast({
        type: "success",
        title: "Agendamento confirmado!",
      });
    }

    loadAgendamentos(filtro);
  };
  const handleCancelar = async () => {
    if (validateAction() === false) {
      addToast({
        title:
          "Falha ao Cancelar, verifique se a linha está selecionada e o agendamento é futuro",
        type: "error",
        options: {
          autoHideDuration: 5000,
        },
      });
      return;
    }

    const data = await cancelarAgendamento(selectedRow || "").catch((err) => {
      addToast({
        type: "error",
        title: "Falha ao cancelar do agendamento: " + err.message,
      });
    });
    if (data) {
      addToast({
        type: "success",
        title: "Agendamento Cancelado!",
      });
    }

    await loadAgendamentos(filtro);
  };

  React.useEffect(() => {
    loadAgendamentos(filtro);
  }, [filtro]);
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
          <Button
            onClick={() => {
              navigate("/agenda/novo");
            }}
          >
            Novo Agendamento
          </Button>
          <Button
            disabled={selectedRow === null}
            onClick={handleSolicitarConfirmacao}
          >
            Solicitar Confirmação
          </Button>
          <Button
            disabled={selectedRow === null}
            onClick={() => {
              handleConfirmar();
            }}
          >
            Confirmar
          </Button>
          <Button
            disabled={selectedRow === null}
            onClick={() => {
              handleCancelar();
            }}
          >
            Cancelar
          </Button>
        </ActionBar>
      </>
    );
  }

  return (
    <MainModulePage
      result={renderResult()}
      searchForm={<AgendamentoSearchForm onSubmit={gravarFiltro} />}
    />
  );
};

export { AgendamentoMain };
