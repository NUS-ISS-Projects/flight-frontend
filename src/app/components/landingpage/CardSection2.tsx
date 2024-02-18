import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";

const cardData = [
  { city: "Bangkok", imageUrl: "/assets/images/thailand.jpg" },
  { city: "Tokyo", imageUrl: "/assets/images/tokyo.jpg" },
  { city: "Paris", imageUrl: "/assets/images/paris.jpg" },
  { city: "Rome", imageUrl: "/assets/images/rome.jpg" },
  { city: "Dubai", imageUrl: "/assets/images/dubai.jpg" },
  { city: "New York", imageUrl: "/assets/images/ny.jpg" },
  { city: "Hong Kong", imageUrl: "/assets/images/hk.jpg" },
  { city: "Taipei", imageUrl: "/assets/images/taiwan.jpg" },
  { city: "Singapore", imageUrl: "/assets/images/singapore.jpg" },
];

const CardSection2 = () => {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 1, md: 2, sm: 3 }}
        sx={{ textAlign: "center" }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, textAlign: "left", mb: 2 }}
          >
            The most popular flights right now
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "left", mb: 4 }}>
            Other travellers are loving these destinations. Search and compare
            flights, hotels, and car hire and join them on the adventure.
          </Typography>
        </Grid>
        {cardData.map(({ city, imageUrl }, index) => (
          <Grid item md={6} lg={4} xs={12} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                backgroundColor: "#fff",
                borderRadius: "0.75rem",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={city}
                sx={{
                  width: { xs: "35%", md: "35%", lg: "40%" },
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    mb: 1,
                    textAlign: "left",
                  }}
                >
                  {city}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Link href="#" color="#e45858" underline="hover">
                    Flights
                  </Link>
                  <Typography color="inherit">.</Typography>
                  <Link href="#" color="#e45858" underline="hover">
                    Details
                  </Link>
                  <Typography color="inherit">.</Typography>
                  <Link href="#" color="#e45858" underline="hover">
                    Book
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardSection2;
