"use client";

import { ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../themes/theme";

import NavBar from "../components/landingpage/NavBar";
import FlightSearchForm from "../components/landingpage/FlightSearchForm";
import HeroSection1 from "../components/landingpage/HeroSection1";
import HeroSection2 from "../components/landingpage/HeroSection2";
import CardSection from "../components/landingpage/CardSection";
import CardSection2 from "../components/landingpage/CardSection2";
import FooterSection from "../components/landingpage/FooterSection";

const SectionWrapper = styled("div")({
  paddingTop: 50,
  paddingBottom: 30,
});

// =============================|| LANDING PAGE MAIN ||============================= //

const Landing = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Nav Bar*/}
      <NavBar />
      {/*Search Component*/}
      <SectionWrapper>
        <FlightSearchForm />
      </SectionWrapper>

      {/*Hero section 1 */}
      <HeroSection1 />

      {/*card section */}
      <SectionWrapper>
        <CardSection />
      </SectionWrapper>

      {/*Hero section 2 */}
      <HeroSection2 />

      {/*List section */}
      <SectionWrapper>
        <CardSection2 />
      </SectionWrapper>

      {/*Footer section */}
      <FooterSection />
    </ThemeProvider>
  );
};

export default Landing;
