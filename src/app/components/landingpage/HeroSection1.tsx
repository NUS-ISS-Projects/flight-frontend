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

import { motion } from "framer-motion";

const HeroSection1 = () => {
  const theme = useTheme();
  const heroPic = "/assets/images/holiday_relax.jpg";

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 30, delay: 0.4 }}
      >
        <Card
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            background: "white",
          }}
        >
          <CardMedia component="img" height="370" image={heroPic} />
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
              padding: "30px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
                  flex: "1",
                  mr: 2,
                }}
              >
                Step into a dream in Australia. Different in every sense
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  width: "auto",
                  minWidth: "100px",
                  maxWidth: "150px",
                  "&:hover": { backgroundColor: theme.palette.grey[300] },
                  alignSelf: "center",
                  mt: "68px",
                }}
              >
                Book Now
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              In partnership with Tourism Singapore
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default HeroSection1;
