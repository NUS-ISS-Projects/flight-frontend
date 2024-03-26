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
import OriginLocationSelector from "../search/OriginLocationSelector";
import ReturnLocationSelector from "../search/ReturnLocationSelector";

import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const selectorStyle = {
  width: "150px",
};

const FlightSearchForm = () => {
  const router = useRouter();
  const [selectedOriginAirportName, setSelectedOriginAirportName] =
    useState("");
  const [selectedOriginAirportCode, setSelectedOriginAirportCode] =
    useState("");

  const [selectedReturnAirportName, setSelectedReturnAirportName] =
    useState("");
  const [selectedReturnAirportCode, setSelectedReturnAirportCode] =
    useState("");
  const [selectedTripType, setSelectedTripType] = useState("Round Trip");
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalChildren, setTotalChildren] = useState(0);
  const [selectedCabinClass, setSelectedCabinClass] = useState("Economy");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd < 10 ? `0${dd}` : dd}`;
  });
  const [selectedReturnDate, setSelectedReturnDate] = useState("");

  const data = {
    selectedTripType,
    selectedCabinClass,
    selectedDepartureDate,
    selectedReturnDate,
    selectedOriginAirportName,
    selectedOriginAirportCode,
    selectedReturnAirportName,
    selectedReturnAirportCode,
    totalAdults,
    totalChildren,
  };

  const handleDepartureDateChange = (e: any) => {
    setSelectedDepartureDate(e.target.value);
  };
  const handleReturnDateChange = (e: any) => {
    setSelectedReturnDate(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(
      Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = typeof value === "number" ? value.toString() : value;
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    console.log(JSON.stringify(data));
    localStorage.setItem("SearchQuery", JSON.stringify(data));
    console.log(queryParams);
    router.push(`/search-depart?${queryParams}`);
  };

  return (
    <Container>
      <Box mt={5} mb={3}>
        <Typography style={{ fontWeight: "700", fontSize: "2rem" }}>
          Millions of cheap flights. One simple search.
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          p: 3,
          pb: 0.4,
          boxShadow: 3,
          borderRadius: 2,
          my: 2,
          position: "relative",
          background: "white",
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item style={selectorStyle}>
            <TripTypeSelector
              selectedTripType={selectedTripType}
              setSelectedTripType={setSelectedTripType}
            />
          </Grid>
          <Grid item>
            <TravellerSelector
              totalAdults={totalAdults}
              setTotalAdults={setTotalAdults}
              totalChildren={totalChildren}
              setTotalChildren={setTotalChildren}
            />
          </Grid>
          <Grid item>
            <CabinClassSelector
              selectedCabinClass={selectedCabinClass}
              setSelectedCabinClass={setSelectedCabinClass}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={3}>
            <OriginLocationSelector
              selectedAirportName={selectedOriginAirportName}
              selectedAirportCode={selectedOriginAirportCode}
              setSelectedAirportName={setSelectedOriginAirportName}
              setSelectedAirportCode={setSelectedOriginAirportCode}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReturnLocationSelector
              selectedAirportName={selectedReturnAirportName}
              selectedAirportCode={selectedReturnAirportCode}
              setSelectedAirportName={setSelectedReturnAirportName}
              setSelectedAirportCode={setSelectedReturnAirportCode}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Departure"
              name="departureDate"
              value={selectedDepartureDate || ""}
              onChange={handleDepartureDateChange}
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
              value={selectedReturnDate || ""}
              onChange={handleReturnDateChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
              disabled={selectedTripType === "One Way"}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box
          display="flex"
          justifyContent="center"
          mt={0.5}
          sx={{
            transform: "translateY(50%)",
            "& > *": {
              borderRadius: "20px",
            },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 5, zIndex: 1 }}
            startIcon={<SearchIcon />}
            onClick={handleSubmit}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FlightSearchForm;
