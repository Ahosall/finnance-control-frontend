import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/auth.hook";

import CategoriesForm from "../../components/CategoriesForm";

const NewCategories = () => {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!token) return;

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: { value: string };
    };
  };

  return (
    <Card component="form" onSubmit={handleSave}>
      <CardContent>
        <Typography variant="h5">Nova Categoria</Typography>

        <CategoriesForm readOnly={loading} />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("/categories")}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="success"
          type="submit"
          loading={loading}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewCategories;
