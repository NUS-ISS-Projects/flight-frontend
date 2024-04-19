import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Box,
  CardActions,
  Divider,
} from "@mui/material";

//Project Import
import PlaneFeatures from "./PlaneFeatures";
import RouteInfo from "./RouteInfo";
import PlaneDetails from "./PlaneDetails";
import airportsData from "@/store/countries.json";

//Icons Import
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Segment } from "@mui/icons-material";

import axios from "axios";

const logoUrl = "assets/images/airline/sgairlines.png";

const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

interface FlightData {
  id: string;
  itineraries: ItinerariesDetails[];
  price: FlightPrice;
}

interface ItinerariesDetails {
  duration: string;
  segments: Segment[];
}
interface FlightPrice {
  total: number;
  currency: string;
}

interface Segment {
  departure: DepartureArrivalDetails;
  arrival: DepartureArrivalDetails;
  carrierCode: string;
  number: string; //flight number
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

interface QueryData {
  selectedTripType: string;
  selectedCabinClass: string;
  selectedOriginAirportName: string;
  selectedOriginAirportCode: string;
  selectedReturnAirportName: string;
  selectedReturnAirportCode: string;
  selectedDepartureDate: string;
  selectedReturnDate: string;
  totalAdults: number;
  totalChildren: number;
}

interface FlightCardProps {
  data: FlightData;
  queryData: QueryData;
}

const formatDuration = (duration: string): string => {
  let formattedDuration = duration
    .replace("PT", "")
    .replace("H", " hrs ")
    .replace("M", " min");
  return formattedDuration;
};
const formatDateTimeToTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

const formatDate = (dateStr: string): string => {
  const dateObj = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "2-digit",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

const findAirportNameByCode = (code: string): string => {
  for (const [country, cities] of Object.entries(airportsData)) {
    for (const [city, airports] of Object.entries(cities)) {
      const airportFound = airports.find((airport) => airport.code === code);
      if (airportFound) {
        return city;
      }
    }
  }
  return "";
};

const FlightCard: React.FC<FlightCardProps> = ({ data, queryData }) => {
  const [expanded, setExpanded] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getFormattedSegments = (segments: any) => {
    return segments.map((segment: any) => ({
      departureTime: formatDateTimeToTime(segment.departure.at),
      arrivalTime: formatDateTimeToTime(segment.arrival.at),
      travelTime: formatDuration(segment.duration),
      departureAirport: findAirportNameByCode(segment.departure.iataCode),
      arrivalAirport: findAirportNameByCode(segment.arrival.iataCode),
      flightNumber: segment.number,
      airCraftNumber: segment.aircraft.code,
      carrierCode: segment.carrierCode,
    }));
  };

  const toggleFavorite = async () => {
    const userName = localStorage.getItem("sessionUsername");
    const serviceToken = window.localStorage.getItem("serviceToken");
    if (userName && serviceToken && favorited == false) {
      const flightDetails = {
        tripType: queryData.selectedTripType,
        noOfAdults: queryData.totalAdults.toString(),
        noOfChildren: queryData.totalChildren.toString(),
        cabinClass: queryData.selectedCabinClass,
        route: `${queryData.selectedOriginAirportCode} - ${queryData.selectedReturnAirportCode}`,
        price: data.price.total.toString(),
        departureDetails: {
          duration: formatDuration(data.itineraries[0]?.duration),
          date: formatDate(queryData.selectedDepartureDate),
          segments: getFormattedSegments(data.itineraries[0].segments),
        },
        returnDetails: {
          duration: formatDuration(data.itineraries[1]?.duration),
          date: formatDate(queryData.selectedReturnDate),
          segments: getFormattedSegments(data.itineraries[1].segments),
        },
      };
      try {
        const response = await axios.post(
          `${API_URL}/user/${userName}/bookmark`,
          flightDetails
        );
        if (response.status === 200) {
          console.log("Bookmark Saved!");
          console.log(response.data.bookmark);
          setFavorited(true);
        }
      } catch (error) {
        //todo: Delete saved record
        console.error("Error saving Bookmark:", error);
      }
    } else if (userName && serviceToken && favorited == true) {
      setFavorited(false);
    } else {
      alert("Please log in to favourite this flight.");
      return;
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        borderRadius: expanded ? "15px" : "2px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logoUrl}
            sx={{ width: 50, height: 50, marginRight: 4 }}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {expanded
                ? `Departure・ ${formatDuration(
                    data.itineraries[0]?.duration
                  )} ・ ${
                    data.itineraries[0]?.segments.length - 1 == 0
                      ? "Non-Stop"
                      : `${data.itineraries[0]?.segments.length - 1} Stops`
                  }`
                : `${formatDateTimeToTime(
                    data.itineraries[0].segments[0].departure.at
                  )} - ${formatDateTimeToTime(
                    data.itineraries[0].segments[
                      data.itineraries[0].segments.length - 1
                    ].arrival.at
                  )}`}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Deperature ・ {queryData.selectedOriginAirportCode} -{" "}
                {queryData.selectedReturnAirportCode}
              </Typography>
            )}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {formatDuration(data.itineraries[0]?.duration)}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {data.itineraries[0]?.segments.length - 1 == 0
                    ? "Non-Stop"
                    : `${data.itineraries[0]?.segments.length - 1} Stops`}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {expanded
                ? `Return・ ${formatDuration(
                    data.itineraries[1]?.duration
                  )} ・  ${
                    data.itineraries[1]?.segments.length - 1 == 0
                      ? "Non-Stop"
                      : `${data.itineraries[1]?.segments.length - 1} Stops`
                  }`
                : `${formatDateTimeToTime(
                    data.itineraries[1].segments[0].departure.at
                  )} - ${formatDateTimeToTime(
                    data.itineraries[1].segments[
                      data.itineraries[1].segments.length - 1
                    ].arrival.at
                  )}`}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Return ・ {queryData.selectedReturnAirportCode} -{" "}
                {queryData.selectedOriginAirportCode}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {formatDuration(data.itineraries[1]?.duration)}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {data.itineraries[1]?.segments.length - 1 == 0
                    ? "Non-Stop"
                    : `${data.itineraries[1]?.segments.length - 1} Stops`}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              SGD ${data.price.total}
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.600" }}>
              {queryData.selectedTripType}
            </Typography>
          </Box>
          <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
            {favorited ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Box>

      {/*Departure Plane information */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            marginLeft: 16,
            marginTop: 2.5,
            marginBottom: -1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Departuring Flight ・ {formatDate(queryData.selectedDepartureDate)}
          </Typography>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.itineraries[0].segments.map((segment, index, array) => (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <RouteInfo segment={segment} />
                <PlaneFeatures />
              </Box>
              <PlaneDetails data={segment} searchQuery={queryData} />
              {index < array.length - 1 && (
                <Divider
                  sx={{
                    display: "flex",
                    my: 2,
                    marginLeft: 8,
                    marginRight: 25,
                  }}
                />
              )}
            </Box>
          ))}
        </CardContent>

        {/* Return Plane information */}
        {queryData.selectedTripType === "Round Trip" && (
          <>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                marginLeft: 16,
                marginTop: 2.5,
                marginBottom: -1,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Returning Flight ・ {formatDate(queryData.selectedReturnDate)}
              </Typography>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {data.itineraries[1].segments.map((segment, index, array) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <RouteInfo segment={segment} />
                    <PlaneFeatures />
                  </Box>
                  <PlaneDetails data={segment} searchQuery={queryData} />
                  {index < array.length - 1 && (
                    <Divider
                      sx={{
                        display: "flex",
                        my: 2,
                        marginLeft: 8,
                        marginRight: 25,
                      }}
                    />
                  )}
                </Box>
              ))}
            </CardContent>
          </>
        )}
      </Collapse>
    </Card>
  );
};
export default FlightCard;
