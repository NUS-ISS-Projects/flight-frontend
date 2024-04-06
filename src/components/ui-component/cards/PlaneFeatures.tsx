import { Box, Typography } from "@mui/material";

import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import UsbIcon from "@mui/icons-material/Usb";
import WifiIcon from "@mui/icons-material/Wifi";
import CastIcon from "@mui/icons-material/Cast";

const features = [
  { text: "Great legroom", Icon: AirlineSeatLegroomExtraIcon },
  { text: "In-seat USB Outlet", Icon: UsbIcon },
  { text: "Wifi available", Icon: WifiIcon },
  { text: "Stream media to your device", Icon: CastIcon },
];

const PlaneFeatures = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 40,
      }}
    >
      {features.map(({ text, Icon }, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
        >
          <Icon sx={{ color: "#70757a", marginRight: 1.5, fontSize: "18px" }} />{" "}
          <Typography variant="caption" sx={{ color: "#70757a" }}>
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PlaneFeatures;
