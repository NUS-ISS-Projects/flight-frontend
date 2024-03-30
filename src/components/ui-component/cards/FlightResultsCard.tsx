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

//Icons Import
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface FlightData {
  id: string;
  logoUrl: string;
  flightTime: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  route: string;
  price: string;
  planeDetails: PlaneDetail;
  stop: string;
  trip: string;
}

interface PlaneDetail {
  airportFrom: string;
  airportTo: string;
  travelTime: string;
  planeSeries: string;
  class: string;
  family: string;
  model: string;
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
}

interface FlightCardProps {
  data: FlightData;
  queryData: QueryData;
}

const FlightCard: React.FC<FlightCardProps> = ({ data, queryData }) => {
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
            src={data.logoUrl}
            sx={{ width: 50, height: 50, marginRight: 4 }}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {expanded
                ? `Departure・ ${data.duration} ・ ${data.stop}`
                : data.flightTime}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Deperature ・ {data.planeDetails.planeSeries}
              </Typography>
            )}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data.duration}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {queryData.selectedOriginAirportCode}-
                  {queryData.selectedReturnAirportCode}・ {data.stop}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {expanded
                ? `Return・ ${data.duration} ・ ${data.stop}`
                : data.flightTime}
            </Typography>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                Return ・ {data.planeDetails.planeSeries}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            {!expanded && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data.duration}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  {queryData.selectedReturnAirportCode}-
                  {queryData.selectedOriginAirportCode} ・ {data.stop}
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
            <Typography sx={{ fontWeight: "bold" }}>{data.price}</Typography>
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
            Departuring Flight ・ {data.departureDate}
          </Typography>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RouteInfo data={data} />
          <PlaneFeatures />
        </CardContent>
        <PlaneDetails data={data} />
        <Divider
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 16,
            marginRight: 16,
          }}
        />
        {/*Multiple Stops*/}
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RouteInfo data={data} />
          <PlaneDetails data={data} />
        </CardContent>
        <PlaneDetails data={data} />

        {/* Return Plane information */}
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
            Returning Flight ・ {data.returnDate}
          </Typography>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RouteInfo data={data} />
          <PlaneFeatures />
        </CardContent>
        <PlaneDetails data={data} />
      </Collapse>
    </Card>
  );
};
export default FlightCard;
