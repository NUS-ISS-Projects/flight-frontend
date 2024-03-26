import React, { useState } from "react";
import {
  TextField,
  Box,
  Grid,
  Container,
  Button,
  Typography,
} from "@mui/material";

//Icons Import
import SearchIcon from "@mui/icons-material/Search";

//Project Import
import TripTypeSelector from "../search/TripTypeSelector";
import CabinClassSelector from "../search/CabinClassSelector";
import TravellerSelector from "../search/TravellerSelector";
import OriginLocationSelector from "../search/OriginLocationSelector";
import ReturnLocationSelector from "../search/ReturnLocationSelector";

const selectorStyle = {
  width: "150px",
};

const getSavedSearchQuery = () => {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem("SearchQuery");
    //console.log(savedValue);
    if (savedValue) {
      try {
        return JSON.parse(savedValue);
      } catch (error) {
        console.error("Parsing error for saved search query", error);
      }
    }
  }
  return {
    selectedTripType: "Round Trip",
    selectedCabinClass: "Economy",
    selectedDepartureDate: "",
    selectedReturnDate: "",
    selectedOriginAirportName: "",
    selectedOriginAirportCode: "",
    selectedReturnAirportName: "",
    selectedReturnAirportCode: "",
    totalAdults: 1,
    totalChildren: 0,
  };
};

const FlightSearchForm = () => {
  const savedQuery = getSavedSearchQuery();
  const [selectedOriginAirportName, setSelectedOriginAirportName] = useState(
    savedQuery.selectedOriginAirportName
  );
  const [selectedOriginAirportCode, setSelectedOriginAirportCode] = useState(
    savedQuery.selectedOriginAirportCode
  );
  const [selectedReturnAirportName, setSelectedReturnAirportName] = useState(
    savedQuery.selectedReturnAirportName
  );
  const [selectedReturnAirportCode, setSelectedReturnAirportCode] = useState(
    savedQuery.selectedReturnAirportCode
  );
  const [selectedTripType, setSelectedTripType] = useState(
    savedQuery.selectedTripType
  );
  const [totalAdults, setTotalAdults] = useState(savedQuery.totalAdults);
  const [totalChildren, setTotalChildren] = useState(savedQuery.totalChildren);
  const [selectedCabinClass, setSelectedCabinClass] = useState(
    savedQuery.selectedCabinClass
  );
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(
    savedQuery.selectedDepartureDate
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState(
    savedQuery.selectedReturnDate
  );

  const handleDepartureDateChange = (e: any) => {
    setSelectedDepartureDate(e.target.value);
  };
  const handleReturnDateChange = (e: any) => {
    setSelectedReturnDate(e.target.value);
  };

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("SearchQuery", JSON.stringify(data));
    window.location.reload();
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
              //label="Departure"
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
              //label="Return"
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
          {/* Submit Button */}
        </Grid>
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
            <Typography variant="button" style={{ fontWeight: "bold" }}>
              Search again?
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FlightSearchForm;
