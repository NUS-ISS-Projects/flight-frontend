// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

// assets
import PublicIcon from "@mui/icons-material/Public";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  "&:hover": {
    color: "#e45858",
  },
  "&:active": {
    color: theme.palette.primary.main,
  },
  fontSize: "0.875rem",
}));

// =============================|| FOOTER SECTION ||============================= //

const FooterSection = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "primary.dark",
          py: { xs: 2, sm: 3, lg: 4 },
          textAlign: { xs: "left", md: "left", lg: "center" },
        }}
      >
        <Container>
          <Grid container spacing={{ xs: 3, sm: 4, md: 8 }}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Typography color="#fff" variant="h6" sx={{ fontWeight: 500 }}>
                  About Sky Scout
                </Typography>
                <Typography color="#fff" variant="body2">
                  Sky Scout is designed to provide users with a comprehensive
                  platform to compare flight fares across multiple airlines,
                  enabling them to find the best airlines for their travel
                  plans.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Typography color="#fff" variant="h6" sx={{ fontWeight: 500 }}>
                  Help
                </Typography>
                {[
                  "Terms of service",
                  "Privacy Settings",
                  "Cookie policy",
                  "Privacy policy",
                ].map((text, index) => (
                  <FooterLink
                    key={index}
                    href="/"
                    target="_blank"
                    underline="none"
                  >
                    {text}
                  </FooterLink>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="#fff" sx={{ mb: 1, mt: 6 }}>
                Compare cheap flight tickets from anywhere to everywhere
              </Typography>
              <Typography variant="body1" color="#fff" sx={{ mb: 2 }}>
                © Sky Scout Pte Ltd
              </Typography>
              <Stack
                direction="row"
                justifyContent={{ xs: "flex-start", md: "left", lg: "center" }}
                spacing={2}
              >
                {[PublicIcon, FacebookRoundedIcon, InstagramIcon].map(
                  (Icon, index) => (
                    <IconButton
                      key={index}
                      component={Link}
                      href="/"
                      aria-label="link"
                      target="_blank"
                      sx={{ color: "#fff", "&:hover": { color: "#e45858" } }}
                    >
                      <Icon />
                    </IconButton>
                  )
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FooterSection;
