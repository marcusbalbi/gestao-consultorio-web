import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AtualizarProfissionalValidationSchema } from "./validationSchemas";
import { ProfissionalForm } from "./ProfissionalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks/toast";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { encontrarProfissional, alterarProfissional } from "./ProfissionalService";
import { CadastrarProfissionalDto } from "./ProfissionalDto";

const ProfissionalAlterar = () => {
  const params = useParams();
  const [formData, setFormData] = React.useState(null);
  const loading = React.useContext(LoadingContext);
  const navigate = useNavigate();
  const { addToast } = useToast();

  React.useEffect(() => {
    if (params.id) {
      encontrarProfissional(params.id).then((data) => {
        setFormData(data);
      });
    }
  }, [params.id]);

  const onSubmit = async (data: CadastrarProfissionalDto) => {
    if (!params.id) return;
    try {
      const result = await alterarProfissional(params.id, data);
      if (result) {
        addToast({
          title: "Alterado com sucesso!",
          type: "success",
        });
        navigate("/profissional");
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
        <ProfissionalForm
          onSubmit={onSubmit}
          updating
          data={formData}
          resolver={yupResolver(AtualizarProfissionalValidationSchema)}
        />
      )}
    </Page>
  );
};

export { ProfissionalAlterar };
