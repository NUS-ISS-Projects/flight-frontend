import { Box, Typography } from "@mui/material";
import airportsData from "@/store/countries.json";
interface Segment {
  departure: DepartureArrivalDetails;
  arrival: DepartureArrivalDetails;
  duration: string;
}
interface DepartureArrivalDetails {
  at: string;
  iataCode: string;
}

interface RouteInfoProps {
  segment: Segment;
}

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
const formatDuration = (duration: string): string => {
  let formattedDuration = duration
    .replace("PT", "")
    .replace("H", " hrs ")
    .replace("M", " min");
  return formattedDuration;
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

const RouteInfo: React.FC<RouteInfoProps> = ({ segment }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: 2,
          marginLeft: 10,
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            border: "2px solid #dadce0",
            borderRadius: "50%",
            width: 12,
            height: 12,
          }}
        ></Box>

        {/* Dotted Line */}
        <Box
          sx={{
            borderLeft: "4px dotted #dadce0",
            marginBottom: "4px",
            marginTop: "4px",
            width: "4px",
            height: "40px",
          }}
        ></Box>
        <Box
          sx={{
            bgcolor: "white",
            border: "2px solid #dadce0",
            borderRadius: "50%",
            width: 12,
            height: 12,
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: 1.5 }}>
          {formatDateTimeToTime(segment.departure.at)}・
          {findAirportNameByCode(segment.departure.iataCode)}
        </Typography>
        <Typography variant="body2" color="#70757a" sx={{ marginBottom: 1.5 }}>
          Travel time: {formatDuration(segment.duration)}
        </Typography>
        <Typography variant="body1">
          {formatDateTimeToTime(segment.arrival.at)}・
          {findAirportNameByCode(segment.arrival.iataCode)}
        </Typography>
      </Box>
    </Box>
  );
};

export default RouteInfo;
