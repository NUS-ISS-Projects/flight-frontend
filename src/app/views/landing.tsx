"use client";

import { useState } from "react";
import Image from "next/image";
import { ThemeProvider, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../themes/theme";

import FlightSearchForm from "../components/FlightSearchForm";

const SectionWrapper = styled("div")({
  paddingTop: 100,
  paddingBottom: 100,
});

// =============================|| LANDING PAGE MAIN ||============================= //

const Landing = () => {
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    cabinClass: "Economy",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // TODO: Send formData to an API endpoint
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box textAlign="center" my={4}>
          <Image
            src="/skyscoutlogo.png"
            alt="SkyScout Logo"
            width={180}
            height={180}
            priority
          />

          <Box mt={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              Flight Search
            </Typography>
          </Box>

          {/*Flight Search Component*/}
          <FlightSearchForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
