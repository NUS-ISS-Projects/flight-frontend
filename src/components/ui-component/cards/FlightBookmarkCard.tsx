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
  Button,
} from "@mui/material";

//Project Import
import PlaneFeatures from "./PlaneFeatures";
import RouteInfo from "./RouteInfoBookmark";
import PlaneDetails from "./PlaneDetailsBookmark";

//Icons Import
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const logoUrl = "assets/images/airline/sgairlines.png";

//Mock Data Interface
interface FlightCardProps {
  data: MockFlightData;
}
interface MockFlightData {
  id: string;
  tripType: string;
  noOfAdults: string;
  noOfChildren: string;
  cabinClass: string;
  route: string;
  price: string;
  stop: string;
  departureDetails: FlightDetails;
  returnDetails: FlightDetails;
}
interface FlightDetails {
  duration: string;
  date: string;
  segments: Segment[];
}
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

const FlightBookmarkCard: React.FC<FlightCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        borderRadius: expanded ? "15px" : "2px",
        width: "100%",
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
                ? `Departure・ ${data.departureDetails.duration} ・ ${
                    data.departureDetails.segments.length - 1 == 0
                      ? "Non-Stop"
                      : `${data.departureDetails.segments.length - 1} Stops`
                  }`
                : `${data.departureDetails.segments[0].departureTime} - ${
                    data.departureDetails.segments[
                      data.departureDetails.segments.length - 1
                    ].arrivalTime
                  }`}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Deperature ・ {data.route}
              </Typography>
            )}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data.departureDetails.duration}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {data.departureDetails.segments.length - 1 == 0
                    ? "Non-Stop"
                    : `${data.departureDetails.segments.length - 1} Stops`}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {expanded
                ? `Return・ ${data.returnDetails.duration} ・  ${
                    data.returnDetails.segments.length - 1 == 0
                      ? "Non-Stop"
                      : `${data.returnDetails.segments.length - 1} Stops`
                  }`
                : `${data.returnDetails.segments[0].departureTime} - ${
                    data.returnDetails.segments[
                      data.returnDetails.segments.length - 1
                    ].arrivalTime
                  }`}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Return ・ {data.route}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data.returnDetails.duration}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {data.returnDetails.segments.length - 1 == 0
                    ? "Non-Stop"
                    : `${data.returnDetails.segments.length - 1} Stops`}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              SGD ${data.price}
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.600" }}>
              {data.tripType}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            // onClick={toggleFavorite}
            sx={{
              color: "error.main",
              borderColor: "error.main",
              backgroundColor: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "error.main",
                color: "white",
                borderColor: "error.main",
                fontWeight: "bold",
              },
            }}
          >
            Delete
          </Button>
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
            Departuring Flight ・ {data.departureDetails.date}
          </Typography>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.departureDetails.segments.map((segment, index, array) => (
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
              <PlaneDetails data={segment} />
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
        {data.tripType === "Round Trip" && (
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
                Returning Flight ・ {data.returnDetails.date}
              </Typography>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {data.returnDetails.segments.map((segment, index, array) => (
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
                  <PlaneDetails data={segment} />
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
export default FlightBookmarkCard;
