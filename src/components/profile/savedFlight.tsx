"use client";
import React, { useState, useEffect } from "react";
import { Container, Box, Button, Grid } from "@mui/material";
import FlightBookmarkCard from "../ui-component/cards/FlightBookmarkCard";

export const mockSavedFlightData = [
  {
    id: "1",
    tripType: "Round Trip",
    noOfAdults: "1",
    noOfChildren: "1",
    cabinClass: "Economy",
    route: "SIN - NRT",
    price: "$888",
    stop: "2",
    departureDetails: {
      duration: "10 hrs 15 min",
      date: "Fri, March 15",
      segments: [
        {
          id: "1",
          departureTime: "08:00 AM",
          arrivalTime: "12:00 PM",
          travelTime: "4 hrs",
          departureAirport: "Singapore - Changi",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "123",
          airCraftNumber: "556",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "12:10 AM",
          arrivalTime: "8:00 AM",
          travelTime: "5hrs 50 hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Tokyo - Narita",
          flightNumber: "300",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
    returnDetails: {
      duration: "10 hrs 45 min",
      date: "Fri, April 12",
      segments: [
        {
          id: "1",
          departureTime: "09:30 AM",
          arrivalTime: "1:45 PM",
          travelTime: "6 hrs 15 min",
          departureAirport: "Tokyo - Narita",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "301",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "4:15 PM",
          arrivalTime: "7:15 PM",
          travelTime: "2hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Singapore - Changi",
          flightNumber: "657",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
  },
  {
    id: "1",
    tripType: "Round Trip",
    noOfAdults: "1",
    noOfChildren: "1",
    cabinClass: "Economy",
    route: "SIN - NRT",
    price: "$888",
    stop: "2",
    departureDetails: {
      duration: "10 hrs 15 min",
      date: "Fri, March 15",
      segments: [
        {
          id: "1",
          departureTime: "08:00 AM",
          arrivalTime: "12:00 PM",
          travelTime: "4 hrs",
          departureAirport: "Singapore - Changi",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "123",
          airCraftNumber: "556",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "12:10 AM",
          arrivalTime: "8:00 AM",
          travelTime: "5hrs 50 hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Tokyo - Narita",
          flightNumber: "300",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
    returnDetails: {
      duration: "10 hrs 45 min",
      date: "Fri, April 12",
      segments: [
        {
          id: "1",
          departureTime: "09:30 AM",
          arrivalTime: "1:45 PM",
          travelTime: "6 hrs 15 min",
          departureAirport: "Tokyo - Narita",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "301",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "4:15 PM",
          arrivalTime: "7:15 PM",
          travelTime: "2hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Singapore - Changi",
          flightNumber: "657",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
  },
  {
    id: "1",
    tripType: "Round Trip",
    noOfAdults: "1",
    noOfChildren: "1",
    cabinClass: "Economy",
    route: "SIN - NRT",
    price: "$888",
    stop: "2",
    departureDetails: {
      duration: "10 hrs 15 min",
      date: "Fri, March 15",
      segments: [
        {
          id: "1",
          departureTime: "08:00 AM",
          arrivalTime: "12:00 PM",
          travelTime: "4 hrs",
          departureAirport: "Singapore - Changi",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "123",
          airCraftNumber: "556",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "12:10 AM",
          arrivalTime: "8:00 AM",
          travelTime: "5hrs 50 hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Tokyo - Narita",
          flightNumber: "300",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
    returnDetails: {
      duration: "10 hrs 45 min",
      date: "Fri, April 12",
      segments: [
        {
          id: "1",
          departureTime: "09:30 AM",
          arrivalTime: "1:45 PM",
          travelTime: "6 hrs 15 min",
          departureAirport: "Tokyo - Narita",
          arrivalAirport: "Ho Chi Minh City",
          flightNumber: "301",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
        {
          id: "2",
          departureTime: "4:15 PM",
          arrivalTime: "7:15 PM",
          travelTime: "2hrs",
          departureAirport: "Ho Chi Minh City",
          arrivalAirport: "Singapore - Changi",
          flightNumber: "657",
          airCraftNumber: "350",
          carrierCode: "vn",
        },
      ],
    },
  },
];

const SavedFlightTab = () => {
  const [viewMore, setViewMore] = useState(false);
  //   const [flightsResult, setFlightsResults] = useState([]);
  const handleViewMore = () => {
    setViewMore(true);
  };
  return (
    <Grid container>
      {mockSavedFlightData
        .slice(0, viewMore ? undefined : 2)
        .map((flight, index) => (
          <FlightBookmarkCard key={index} data={flight} />
        ))}

      {!viewMore && mockSavedFlightData.length > 2 && (
        <Grid item xs={12}>
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
        </Grid>
      )}
    </Grid>
  );
};

export default SavedFlightTab;
