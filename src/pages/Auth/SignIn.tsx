import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/auth.hook";
import { useQuery } from "../../hooks/query.hook";

const SignIn = () => {
  const navigate = useNavigate();
  const queries = useQuery();

  const { token, login } = useAuth();

  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const toSignUp = () => navigate("/signup");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };

    login(formElements.email.value, formElements.password.value)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.status === 401) {
          setMessageError("E-mail ou senha incorretos");
          return;
        }
        setMessageError("Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    setEmail(queries.get("email") || "");
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "100%", height: "100%", p: 3 }}>
        <Box sx={{ position: "absolute", bottom: 0, p: 3 }}>
          <Typography variant="h2" sx={{ fontWeight: 500 }}>
            FinnanceControl
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Visualize, organize e otimize suas finanças!
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ position: "absolute", right: 0, height: "100%", width: "450px" }}
      >
        <Card
          sx={{ height: "100%", borderRadius: 0 }}
          component="form"
          onSubmit={handleLogin}
        >
          <CardContent
            sx={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <Box sx={{ px: 3 }}>
              <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Acesse sua conta
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  mb: 2,
                  color: messageError === "" ? "text.secondary" : "red",
                }}
              >
                {messageError === ""
                  ? "Seu dinheiro, sob controle!"
                  : messageError}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    id="email"
                    type="email"
                    label="E-mail"
                    autoComplete="off"
                    defaultValue={email}
                    autoFocus
                    disabled={loading}
                    error={messageError != ""}
                    onChange={() => setMessageError("")}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="password"
                    type="password"
                    label="Senha"
                    autoComplete="off"
                    disabled={loading}
                    error={messageError != ""}
                    onChange={() => setMessageError("")}
                    fullWidth
                    required
                  />
                </Grid>
                <Typography
                  color="text.secondary"
                  textAlign="center"
                  width="100%"
                  sx={{ mt: 1 }}
                >
                  Novo aqui?{" "}
                  <Typography
                    component="span"
                    color="success"
                    sx={{ cursor: "pointer" }}
                    onClick={toSignUp}
                  >
                    Cadastre-se
                  </Typography>
                  !
                </Typography>
                <Box sx={{ mt: 2, width: "100%" }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    loading={loading}
                    fullWidth
                  >
                    Entrar
                  </Button>
                </Box>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignIn;
