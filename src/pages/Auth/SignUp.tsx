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

import UsersService from "../../services/users.service";

const SignUp = () => {
  const { token } = useAuth();

  const [messageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [retypeError, setRetypeError] = useState("");

  const navigate = useNavigate();

  const toSignIn = () => navigate("/signin");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError !== "") return;

    const usersApi = new UsersService();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    usersApi
      .createUser(
        formElements.name.value,
        formElements.email.value,
        formElements.password.value
      )
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        setMessageError("Falha ao tentar criar usuário");
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ position: "absolute", height: "100%", width: "450px" }}>
        <Card
          sx={{ height: "100%", borderRadius: 0 }}
          component="form"
          onSubmit={handleSignUp}
        >
          <CardContent
            sx={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <Box sx={{ px: 3 }}>
              <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Crie sua conta
              </Typography>
              <Typography
                sx={{ textAlign: "center", mb: 2, color: "text.secondary" }}
              >
                {messageError !== ""
                  ? "Seu controle financeiro começa aqui!"
                  : ""}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    type="text"
                    label="Nome Completo"
                    autoComplete="off"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    type="email"
                    label="E-mail"
                    autoComplete="off"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    error={passwordError !== ""}
                    type="password"
                    label="Senha"
                    autoComplete="off"
                    helperText={passwordError}
                    fullWidth
                    required
                    onChange={(e) => {
                      const pwd = e.target.value;
                      if (pwd.length < 8) {
                        setPasswordError("Precisa ter no minimo 8 caracteres");
                      } else {
                        setPassword(pwd);
                        setPasswordError("");
                      }
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    error={retypeError !== ""}
                    type="password"
                    label="Senha Novamente"
                    autoComplete="off"
                    helperText={retypeError}
                    fullWidth
                    required
                    onChange={(e) => {
                      const pwd = e.target.value;
                      setRetypeError(
                        password !== pwd ? "As senhas não coincidem" : ""
                      );
                    }}
                  />
                </Grid>
                <Typography
                  color="text.secondary"
                  textAlign="center"
                  width="100%"
                  sx={{ mt: 1 }}
                >
                  Já tem uma conta?{" "}
                  <Typography
                    component="span"
                    color="success"
                    sx={{ cursor: "pointer" }}
                    onClick={toSignIn}
                  >
                    Acesse agora
                  </Typography>
                  !
                </Typography>
                <Box sx={{ mt: 2, width: "100%" }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    fullWidth
                  >
                    Cadastrar
                  </Button>
                </Box>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ width: "100%", height: "100%", p: 3 }}>
        <Box
          sx={{
            position: "absolute",
            textAlign: "right",
            bottom: 0,
            right: 0,
            p: 3,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 500 }}>
            FinnanceControl
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Acompanhe seus gastos e receitas sem complicação.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
