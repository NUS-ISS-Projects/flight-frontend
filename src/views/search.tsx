"use client";

import { Divider, ThemeProvider, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../themes/theme";

import NavBar from "../components/landingpage/NavBar";
import FlightSearchForm from "../components/landingpage/FlightSearchForm";
import FooterSection from "../components/landingpage/FooterSection";

const SectionWrapper = styled("div")({
  paddingTop: 100,
  paddingBottom: 30,
});

const FormContainer = styled(Box)(() => ({
  maxWidth: "1200px",
  margin: "auto",
}));

const DividerContainer = styled(Box)(() => ({
  maxWidth: "1150px",
  margin: "auto",
}));

const searchPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <SectionWrapper>
        <FormContainer>
          <FlightSearchForm />
        </FormContainer>
      </SectionWrapper>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <SectionWrapper></SectionWrapper>
      <FooterSection />
    </ThemeProvider>
  );
};

export default searchPage;
