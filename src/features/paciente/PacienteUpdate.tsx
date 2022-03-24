import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AtualizarPacienteSchema } from "./validationSchemas";
import { PacienteForm } from "./PacienteForm";
import { useParams } from "react-router-dom";
import { findPatient } from "./pacienteService";
import LoadingContext from "../../hooks/loading/LoadingContext";

const PacienteUpdate = () => {
  const params = useParams();
  const [formData, setFormData] = React.useState(null);
    const loading = React.useContext(LoadingContext);

  React.useEffect(() => {
    if (params.id) {
      findPatient(params.id).then((data) => {
        setFormData(data);
      });
    }
  }, [params.id]);

  return (
    <Page>
      {!loading && (
        <PacienteForm
          updating
          data={formData}
          resolver={yupResolver(AtualizarPacienteSchema)}
        />
      )}
    </Page>
  );
};

export { PacienteUpdate };
