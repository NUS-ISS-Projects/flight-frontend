import React, { useState } from "react";
import type { NextPage } from "next";
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
import CheckIcon from "@mui/icons-material/Check";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { FlightCard } from "../ui-component/cards/FlightResultsCard";

//assets

export const mockFlightsData = [
  {
    id: "1",
    logoUrl: "/assets/images/airline/airasia.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "1 hr 25 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "round trip",
    stop: "Nonstop",
    departureDate: "Fri, March 15",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Air Asia",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
  {
    id: "2",
    logoUrl: "/assets/images/airline/scoot.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "4hr 20 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "round trip",
    stop: "1 stop",
    departureDate: "Sat, March 16",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Scoot",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
  {
    id: "3",
    logoUrl: "/assets/images/airline/sgairlines.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "4hr 25 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "one way",
    stop: "2 stop",
    departureDate: "Fri, March 15",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Singapre Airlines",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
  {
    id: "4",
    logoUrl: "/assets/images/airline/sgairlines.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "4hr 25 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "one way",
    stop: "2 stop",
    departureDate: "Fri, March 15",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Singapre Airlines",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
  {
    id: "5",
    logoUrl: "/assets/images/airline/sgairlines.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "4hr 25 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "one way",
    stop: "2 stop",
    departureDate: "Fri, March 15",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Singapre Airlines",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
  {
    id: "6",
    logoUrl: "/assets/images/airline/sgairlines.png",
    flightTime: "08:00 AM - 12:00 PM",
    duration: "4hr 25 mins",
    route: "SIN-LGK",
    price: "USD 500",
    trip: "one way",
    stop: "2 stop",
    departureDate: "Fri, March 15",
    planeDetails: {
      airportFrom: "Changi Airport (SIN)",
      airportTo: "Langkawi International Airport (LGK)",
      travelTime: "4h",
      planeSeries: "Singapre Airlines",
      class: "Economy",
      family: "Airbus A320",
      model: "AK 706",
    },
  },
];

const DepartingFlights: NextPage = () => {
  const [selectedSortType, setSelectedSortType] = useState("Best Flight");
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (sortType: any) => {
    setSelectedSortType(sortType);
    handleClose();
  };

  const handleViewMore = () => {
    setViewMore(true);
  };

  return (
    <Container sx={{ mt: -7 }}>
      <Box sx={{ my: 4 }}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              Departing flights
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
              {["Price", "Departure Time", "Arrival Time", "Duration"].map(
                (sortType) => (
                  <MenuItem
                    key={sortType}
                    onClick={() => handleSelect(sortType)}
                    sx={{ fontSize: "0.875rem", pl: 4 }} // Adjusted padding to maintain gap
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
                )
              )}
            </Menu>
          </Grid>
        </Grid>
      </Box>
      {mockFlightsData.slice(0, viewMore ? undefined : 2).map((flight) => (
        <FlightCard key={flight.id} data={flight} isReturnView={true} />
      ))}
      {!viewMore && mockFlightsData.length > 2 && (
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

export default DepartingFlights;
