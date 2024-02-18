"use client";

import NavBar from "../components/landingpage/NavBar";
import { useState, useEffect } from "react";
import { ThemeProvider, Typography, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../themes/theme";
import Link from "next/link";

const SectionWrapper = styled("div")({
  paddingTop: 50,
  paddingBottom: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)", // Adjust based on your Navbar height
});

const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Logging in with:", username, password);
  };

  useEffect(() => {
    // This code runs only on the client-side
    // You can place any client-side specific logic here
  }, []); // Empty dependency array ensures this effect runs only once after component mount

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <SectionWrapper>
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <LoginForm onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Login
            </Button>
          </LoginForm>
          <Typography variant="body2" align="center">
            Do not have an account?{" "}
            <Link href="/register" passHref>
              Register
            </Link>
          </Typography>
        </Box>
      </SectionWrapper>
    </ThemeProvider>
  );
};

export default LoginPage;
