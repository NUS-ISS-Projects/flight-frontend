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

//Icons Import
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import UsbIcon from "@mui/icons-material/Usb";
import WifiIcon from "@mui/icons-material/Wifi";
import CastIcon from "@mui/icons-material/Cast";

interface PlaneDetails {
  airportFrom: string;
  airportTo: string;
  travelTime: string;
  planeSeries: string;
  class: string;
  family: string;
  model: string;
}

interface FlightData {
  id: string;
  logoUrl: string;
  flightTime: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  route: string;
  price: string;
  planeDetails: PlaneDetails;
  stop: string;
  trip: string;
}

interface FlightCardProps {
  data: FlightData;
  isReturnView?: boolean;
}

const features = [
  { text: "Great legroom", Icon: AirlineSeatLegroomExtraIcon },
  { text: "In-seat USB Outlet", Icon: UsbIcon },
  { text: "Wifi available", Icon: WifiIcon },
  { text: "Stream media to your device", Icon: CastIcon },
];

export const FlightCard: React.FC<FlightCardProps> = ({ data }) => {
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
                  {data.route}・ {data.stop}
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
                  {data.route} ・ {data.stop}
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
              {data.trip}
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

      {/* Dropdown information */}
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
                {data.flightTime.split(" - ")[0]} ・{" "}
                {data.planeDetails.airportFrom}
              </Typography>
              <Typography
                variant="body2"
                color="#70757a"
                sx={{ marginBottom: 1.5 }}
              >
                Travel time: {data.duration}
              </Typography>
              <Typography variant="body1">
                {data.flightTime.split(" - ")[1]}・{data.planeDetails.airportTo}
              </Typography>
            </Box>
          </Box>

          {/* Deperature Plane information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            {features.map(({ text, Icon }, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Icon
                  sx={{ color: "#70757a", marginRight: 1.5, fontSize: "18px" }}
                />{" "}
                <Typography variant="caption" sx={{ color: "#70757a" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 16,
            marginBottom: 1.5,
          }}
        >
          <Typography variant="caption" color="#70757a">
            {data.planeDetails.planeSeries}・ {data.planeDetails.class}・{" "}
            {data.planeDetails.family}・ {data.planeDetails.model}
          </Typography>
        </Box>
        <Divider
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 16,
            marginRight: 16,
          }}
        />
        {/*IF THERE IS MULTIPLE STOPS*/}
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
                {data.flightTime.split(" - ")[0]} ・{" "}
                {data.planeDetails.airportFrom}
              </Typography>
              <Typography
                variant="body2"
                color="#70757a"
                sx={{ marginBottom: 1.5 }}
              >
                Travel time: {data.duration}
              </Typography>
              <Typography variant="body1">
                {data.flightTime.split(" - ")[1]}・{data.planeDetails.airportTo}
              </Typography>
            </Box>
          </Box>

          {/* Deperature Plane information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            {features.map(({ text, Icon }, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Icon
                  sx={{ color: "#70757a", marginRight: 1.5, fontSize: "18px" }}
                />{" "}
                <Typography variant="caption" sx={{ color: "#70757a" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 16,
            marginBottom: 1.5,
          }}
        >
          <Typography variant="caption" color="#70757a">
            {data.planeDetails.planeSeries}・ {data.planeDetails.class}・{" "}
            {data.planeDetails.family}・ {data.planeDetails.model}
          </Typography>
        </Box>

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
                {data.flightTime.split(" - ")[0]} ・{" "}
                {data.planeDetails.airportFrom}
              </Typography>
              <Typography
                variant="body2"
                color="#70757a"
                sx={{ marginBottom: 1.5 }}
              >
                Travel time: {data.duration}
              </Typography>
              <Typography variant="body1">
                {data.flightTime.split(" - ")[1]}・{data.planeDetails.airportTo}
              </Typography>
            </Box>
          </Box>

          {/* Plane information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            {features.map(({ text, Icon }, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Icon
                  sx={{ color: "#70757a", marginRight: 1.5, fontSize: "18px" }}
                />{" "}
                <Typography variant="caption" sx={{ color: "#70757a" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 16,
            marginBottom: 1.5,
          }}
        >
          <Typography variant="caption" color="#70757a">
            {data.planeDetails.planeSeries}・ {data.planeDetails.class}・{" "}
            {data.planeDetails.family}・ {data.planeDetails.model}
          </Typography>
        </Box>
      </Collapse>
    </Card>
  );
};
