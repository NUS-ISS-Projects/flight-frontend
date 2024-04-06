import { Box, Typography } from "@mui/material";
interface Segment {
  aircraft: Aircraft;
  number: string;
  carrierCode: string;
}
interface Aircraft {
  code: string;
}

interface searchQuery {
  selectedCabinClass: string;
}

interface PlaneDetailsProps {
  data: Segment;
  searchQuery: searchQuery;
}

const PlaneDetails: React.FC<PlaneDetailsProps> = ({ data, searchQuery }) => {
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
        {searchQuery.selectedCabinClass}・ Flight Number: {data.number}・
        Aircraft: {data.aircraft.code}・ Carrier: {data.carrierCode}
      </Typography>
    </Box>
  );
};
export default PlaneDetails;
