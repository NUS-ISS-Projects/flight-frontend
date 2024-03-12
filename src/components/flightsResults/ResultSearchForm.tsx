import { useState } from "react";
import React from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Container,
  Typography,
} from "@mui/material";

//Icons Import
import TripTypeSelector from "../search/TripTypeSelector";
import CabinClassSelector from "../search/CabinClassSelector";
import TravellerSelector from "../search/TravellerSelector";

import SearchIcon from "@mui/icons-material/Search";

const selectorStyle = {
  width: "150px",
};

const FlightSearchForm = () => {
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    cabinClass: "Economy",
    tripType: "Round Trip",
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
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          p: 3,
          pb: 0.4,
          borderRadius: 2,
          my: 2,
          position: "relative",
          background: "white",
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item style={selectorStyle}>
            <TripTypeSelector />
          </Grid>
          <Grid item>
            <TravellerSelector />
          </Grid>
          <Grid item>
            <CabinClassSelector />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="From Where"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Where to"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Departure"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Return"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FlightSearchForm;
