import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AtualizarPacienteSchema } from "./validationSchemas";
import { PacienteForm } from "./PacienteForm";
import { useNavigate, useParams } from "react-router-dom";
import { findPatient, updatePaciente } from "./pacienteService";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { CadastrarPacienteDto } from "./pacienteDto";
import { useToast } from "../../hooks/toast";

const PacienteUpdate = () => {
  const params = useParams();
  const [formData, setFormData] = React.useState(null);
  const loading = React.useContext(LoadingContext);
  const navigate = useNavigate();
  const { addToast } = useToast();

  React.useEffect(() => {
    if (params.id) {
      findPatient(params.id).then((data) => {
        setFormData(data);
      });
    }
  }, [params.id]);

  const onSubmit = async (data: CadastrarPacienteDto) => {
    if (!params.id) return;
    try {
      const result = await updatePaciente(params.id, data);
      if (result) {
        addToast({
          title: "Alterado com sucesso!",
          type: "success",
        });
        navigate("/paciente");
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
      {!loading && (
        <PacienteForm
          onSubmit={onSubmit}
          updating
          data={formData}
          resolver={yupResolver(AtualizarPacienteSchema)}
        />
      )}
    </Page>
  );
};

export { PacienteUpdate };
