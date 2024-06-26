import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  MenuItem,
  Menu,
  ListItemText,
  Grid,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FlightCard from "../ui-component/cards/FlightResultsCard";

const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

interface Flight {
  id: string;
  price: FlightPrice;
  itineraries: ItinerariesDetails[];
}

interface ItinerariesDetails {
  duration: string; // Make sure this is always a string, not undefined
  segments: Segment[];
}

interface Segment {
  departure: DepartureArrivalDetails;
  arrival: DepartureArrivalDetails;
  carrierCode: string;
  number: string;
  aircraft: AircraftDetails;
  duration: string;
  numberOfStops: number;
}

interface DepartureArrivalDetails {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface AircraftDetails {
  code: string;
}

interface FlightPrice {
  total: number;
  currency: string;
}

const MainFlightsFlightResult = () => {
  const [selectedSortType, setSelectedSortType] = useState("Best Flight");
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const open = Boolean(anchorEl);
  const [flightData, setFlightData] = useState({
    selectedTripType: "",
    selectedCabinClass: "",
    selectedDepartureDate: "",
    selectedReturnDate: "",
    selectedOriginAirportName: "",
    selectedOriginAirportCode: "",
    selectedReturnAirportName: "",
    selectedReturnAirportCode: "",
    totalAdults: 0,
    totalChildren: 0,
  });
  const [flightsResult, setFlightsResults] = useState<Flight[]>([]);

  useEffect(() => {
    const storedFlightData = localStorage.getItem("SearchQuery");
    if (storedFlightData) {
      const parsedData = JSON.parse(storedFlightData);
      setFlightData(parsedData);
      console.log(parsedData);
    }
  }, []);

  useEffect(() => {
    if (
      flightData.selectedOriginAirportCode &&
      flightData.selectedReturnAirportCode &&
      flightData.selectedDepartureDate
    ) {
      axios
        .get(`${API_URL}/flights`, {
          params: {
            origin: flightData.selectedOriginAirportCode,
            destination: flightData.selectedReturnAirportCode,
            departDate: flightData.selectedDepartureDate,
            returnDate: flightData.selectedReturnDate,
            travelClass: flightData.selectedCabinClass.toUpperCase(),
            adults: flightData.totalAdults,
            children: flightData.totalChildren,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFlightsResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flight data", error);
        });
    }
  }, [flightData]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (sortType: any) => {
    setSelectedSortType(sortType);
    const sortedFlights = sortFlights([...flightsResult], sortType);
    setFlightsResults(sortedFlights);
    handleClose();
  };

  const handleViewMore = () => {
    setViewMore(true);
  };
  const sortFlights = (flights: Flight[], sortType: string): Flight[] => {
    switch (sortType) {
      case "Price":
        return flights.sort((a, b) => a.price.total - b.price.total);
      case "Departure Time":
        return flights.sort(
          (a, b) =>
            new Date(a.itineraries[0].segments[0].departure.at).getTime() -
            new Date(b.itineraries[0].segments[0].departure.at).getTime()
        );
      case "Arrival Time":
        return flights.sort(
          (a, b) =>
            new Date(
              a.itineraries[0].segments[
                a.itineraries[0].segments.length - 1
              ].arrival.at
            ).getTime() -
            new Date(
              b.itineraries[0].segments[
                b.itineraries[0].segments.length - 1
              ].arrival.at
            ).getTime()
        );
      case "Deperature Time (Return)":
        return flights.sort(
          (a, b) =>
            new Date(a.itineraries[1].segments[0].departure.at).getTime() -
            new Date(b.itineraries[1].segments[0].departure.at).getTime()
        );
      case "Arrival Time (Return)":
        return flights.sort(
          (a, b) =>
            new Date(
              a.itineraries[1].segments[
                a.itineraries[1].segments.length - 1
              ].arrival.at
            ).getTime() -
            new Date(
              b.itineraries[1].segments[
                b.itineraries[1].segments.length - 1
              ].arrival.at
            ).getTime()
        );
      default:
        return flights;
    }
  };

  return (
    <Container sx={{ mt: -7 }}>
      <Box sx={{ my: 4 }}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              Best flights deals
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", mt: -1 }}
            >
              Prices include required taxes + fees for 1 adult. Optional charges
              and <span style={{ textDecoration: "underline" }}>bag fees</span>{" "}
              may apply.{" "}
              <a href="#" style={{ textDecoration: "underline" }}>
                Passenger assistance info.
              </a>
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Typography
              variant="body2"
              sx={{ mt: 4, mr: 1, verticalAlign: "middle" }}
            >
              Sort by:
            </Typography>
            <Tooltip title="Sort by">
              <IconButton
                onClick={handleClick}
                color="inherit"
                size="small"
                sx={{
                  verticalAlign: "bottom",
                  "&:hover": { borderRadius: "0.3rem" },
                  mt: 3,
                }}
              >
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {[
                "Price",
                "Departure Time",
                "Arrival Time",
                "Deperature Time (Return)",
                "Arrival Time (Return)",
              ].map((sortType) => (
                <MenuItem
                  key={sortType}
                  onClick={() => handleSelect(sortType)}
                  sx={{ fontSize: "0.875rem", pl: 4 }}
                >
                  {selectedSortType === sortType && (
                    <CheckIcon
                      color="primary"
                      fontSize="small"
                      sx={{ mr: 1, position: "absolute", left: 8 }}
                    />
                  )}
                  <ListItemText primary={sortType} />
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Box>
      {flightsResult.slice(0, viewMore ? undefined : 2).map((flight, index) => (
        <FlightCard key={index} data={flight} queryData={flightData} />
      ))}
      {!viewMore && flightsResult.length > 2 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 5,
          }}
        >
          <Button
            onClick={handleViewMore}
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MainFlightsFlightResult;
