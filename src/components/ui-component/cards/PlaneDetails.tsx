import { Box, Typography } from "@mui/material";

interface FlightData {
  planeDetails: PlaneDetails;
}
interface PlaneDetails {
  planeSeries: string;
  class: string;
  family: string;
  model: string;
}

interface PlaneDetailsProps {
  data: FlightData;
}

const PlaneDetails: React.FC<PlaneDetailsProps> = ({ data }) => {
  return (
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
  );
};
export default PlaneDetails;
