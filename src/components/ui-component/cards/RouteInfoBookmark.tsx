import { Box, Typography } from "@mui/material";
interface Segment {
  id: string;
  departureTime: string;
  arrivalTime: string;
  travelTime: string;
  departureAirport: string;
  arrivalAirport: string;
  flightNumber: string;
  airCraftNumber: string;
  carrierCode: string;
}

interface RouteInfoProps {
  segment: Segment;
}

const RouteInfoBookmark: React.FC<RouteInfoProps> = ({ segment }) => {
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
          {segment.departureTime}・{segment.departureAirport}
        </Typography>
        <Typography variant="body2" color="#70757a" sx={{ marginBottom: 1.5 }}>
          Travel time: {segment.travelTime}
        </Typography>
        <Typography variant="body1">
          {segment.arrivalTime}・{segment.arrivalAirport}
        </Typography>
      </Box>
    </Box>
  );
};

export default RouteInfoBookmark;
