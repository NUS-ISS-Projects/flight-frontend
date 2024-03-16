"use client";

import { useState } from "react";
import {
  ThemeProvider,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import theme from "../themes/theme";
import NavBar from "../components/landingpage/NavBar";

const SectionWrapper = styled("div")({
  paddingTop: 50,
  paddingBottom: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)", // Adjust based on your Navbar height
});

const RegisterForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your registration logic here
    console.log("Registering with:", name,username, email, password);
    try {
      const response =  fetch("http://localhost:8888/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      });
      if ((await response).ok) {
        console.log("Registration successful");
        
      } else {
        console.error("Registration failed");
        
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <SectionWrapper>
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <RegisterForm onSubmit={handleRegister}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Register
            </Button>
          </RegisterForm>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link href="/login" passHref>
              Login
            </Link>
          </Typography>
        </Box>
      </SectionWrapper>
    </ThemeProvider>
  );
};

export default RegisterPage;
