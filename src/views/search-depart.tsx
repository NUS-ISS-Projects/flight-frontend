"use client";

import { Divider, Box } from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import theme from "../themes/theme";

import NavBar from "../components/landingpage/NavBar";
import FlightSearchForm from "../components/flightsResults/ResultSearchForm";
import SearchResults from "../components/flightsResults/MainFlightsResults";
import FooterSection from "../components/landingpage/FooterSection";

const SectionWrapper = styled("div")({
  paddingTop: 50,
  paddingBottom: 30,
});

const DividerContainer = styled(Box)(() => ({
  maxWidth: "1150px",
  margin: "auto",
}));

const searchPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <SectionWrapper>
        <FlightSearchForm />
      </SectionWrapper>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <SectionWrapper>
        <SearchResults />
      </SectionWrapper>
      <FooterSection />
    </ThemeProvider>
  );
};

export default searchPage;
