import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { BackgroundImage, Card, Container } from "@mantine/core";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ልዳን
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", { userName, password })
      .then(function (response) {
        sessionStorage.setItem("token", response.data.token);
        navigate("/report");
        // console.log(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({
      userName,
      password,
    });
  };

  return (
    <BackgroundImage src="./background.png">
      <Container size="xs" px="xs" style={{ paddingTop: "50px" }}>
        <Card shadow="lg" p="lg" radius="lg" withBorder>
          <div>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#2196F3" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ color: "#2196F3" }}
                  >
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="Username"
                      name="userName"
                      autoComplete="userName"
                      autoFocus
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </div>
        </Card>
      </Container>
      <br />
      <br /> <br />
    </BackgroundImage>
  );
}

export default AdminLogin;
