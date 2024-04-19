import { Box, Typography } from "@mui/material";
interface Segment {
  flightNumber: string;
  airCraftNumber: string;
  carrierCode: string;
}
interface PlaneDetailsProps {
  data: Segment;
}

const PlaneDetailsBookmark: React.FC<PlaneDetailsProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 14,
        marginBottom: 1.5,
      }}
    >
      <Typography variant="caption" color="#70757a">
        Flight Number: {data.flightNumber}・ Aircraft: {data.airCraftNumber}・
        Carrier: {data.carrierCode}
      </Typography>
    </Box>
  );
};
export default PlaneDetailsBookmark;
