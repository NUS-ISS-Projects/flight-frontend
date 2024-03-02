// src/pages/searchResults.tsx
import type { NextPage } from "next";
import { Container } from "@mui/material";
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
];

const DepartingFlights: NextPage = () => {
  return (
    <Container>
      {mockFlightsData.map((flight) => (
        <FlightCard key={flight.id} data={flight} />
      ))}
    </Container>
  );
};

export default DepartingFlights;
