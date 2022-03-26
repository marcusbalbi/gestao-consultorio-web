import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AgendarDto } from "./agendamentoDto";
import { AgendarValdationSchema } from "./validationSchemas";
import { agendar } from "./agendamentoService";
import { AgendamentoForm } from "./AgendamentoForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";

const AgendamentoCreate = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const onSubmit = async (data: AgendarDto) => {
    try {
      const result = await agendar(data);
      if (result) {
        addToast({
          title: "Agendamento criado!",
          type: "success",
        });
        navigate("/agendamentos");
      }
    } catch (err: any) {
      addToast({
        title: err.message,
        type: "error",
      });
    }
  };
  return (
    <Page>
      <AgendamentoForm
        resolver={yupResolver(AgendarValdationSchema)}
        onSubmit={onSubmit}
      />
    </Page>
  );
};

export { AgendamentoCreate };
