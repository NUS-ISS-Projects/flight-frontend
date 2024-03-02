// material-ui
import { Container, Grid, Typography, Stack } from "@mui/material";

// assets
import LanguageIcon from "@mui/icons-material/Language";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const CardSection = () => {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 1, md: 2, sm: 3 }}
        sx={{ textAlign: "center" }}
      >
        <Grid item md={3} sm={6} xs={12}>
          <Stack
            direction={{ xs: "column", md: "column", sm: "row", lg: "row" }}
            alignItems="flex-start"
            sx={{
              backgroundColor: "primary.main",
              padding: "18px",
              borderRadius: "0.75rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              color: "#fff",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#4431a3",
              },
            }}
            spacing={2}
          >
            <LanguageIcon sx={{ fontSize: "1.5rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "start",
                width: "100%",
              }}
            >
              Explore everywhere
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Stack
            direction={{ xs: "column", md: "column", sm: "row", lg: "row" }}
            alignItems="flex-start"
            sx={{
              backgroundColor: "primary.main",
              padding: "18px",
              borderRadius: "0.75rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              color: "#fff",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#4431a3",
              },
            }}
            spacing={2}
          >
            <AutoAwesomeIcon sx={{ fontSize: "1.5rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "start",
              }}
            >
              Let AI inspire your trip
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Stack
            direction={{ xs: "column", md: "column", sm: "row", lg: "row" }}
            alignItems="flex-start"
            sx={{
              backgroundColor: "primary.main",
              padding: "18px",
              borderRadius: "0.75rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              color: "#fff",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#4431a3",
              },
            }}
            spacing={2}
          >
            <FlightTakeoffIcon sx={{ fontSize: "1.5rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "start",
              }}
            >
              Popular flights now
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Stack
            alignItems="flex-start"
            direction={{ xs: "column", md: "column", sm: "row", lg: "row" }}
            sx={{
              backgroundColor: "primary.main",
              padding: "18px",
              borderRadius: "0.75rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              color: "#fff",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#4431a3",
              },
            }}
            spacing={2}
          >
            <HourglassTopIcon sx={{ fontSize: "1.5rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "start",
              }}
            >
              Last minute deals
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardSection;
