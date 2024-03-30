import { Box, Typography } from "@mui/material";

interface FlightData {
  duration: string;
  flightTime: string;
  planeDetails: PlaneDetails;
}

interface PlaneDetails {
  airportFrom: string;
  airportTo: string;
}

interface RouteInfoProps {
  data: FlightData;
}

const RouteInfo: React.FC<RouteInfoProps> = ({ data }) => {
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
          {data.flightTime.split(" - ")[0]} ・ {data.planeDetails.airportFrom}
        </Typography>
        <Typography variant="body2" color="#70757a" sx={{ marginBottom: 1.5 }}>
          Travel time: {data.duration}
        </Typography>
        <Typography variant="body1">
          {data.flightTime.split(" - ")[1]}・{data.planeDetails.airportTo}
        </Typography>
      </Box>
    </Box>
  );
};

export default RouteInfo;
