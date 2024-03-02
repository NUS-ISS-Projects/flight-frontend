import {
  Box,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";

import FadeInWhenVisible from "./Animation";

const HeroSection2 = () => {
  const theme = useTheme();
  const heroPic = "/assets/images/holiday_relax2.jpg";

  return (
    <Container>
      <FadeInWhenVisible>
        <Card
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            background: "white",
          }}
        >
          <CardMedia
            component="img"
            height="370"
            image={heroPic}
            alt="Hero Image"
          />
          <CardContent
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: "350px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.0rem", sm: "2rem", md: "2.8rem" },
                  mb: 2,
                }}
              >
                See where your imagination takes you
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  fontWeight: "bold",
                  fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" },
                }}
              >
                Explore your dream destinations and hidden gems with our new AI
                powered tool
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  minWidth: "150px",
                  height: "40px",
                  "&:hover": { backgroundColor: theme.palette.grey[300] },
                  whiteSpace: "nowrap",
                }}
              >
                Search with AI
              </Button>
            </Box>
          </CardContent>
        </Card>
      </FadeInWhenVisible>
    </Container>
  );
};

export default HeroSection2;
