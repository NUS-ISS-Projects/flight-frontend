"use client";

import { ThemeProvider, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../themes/theme";
import Link from "next/link";


<<<<<<< HEAD
import FlightSearchForm from "../components/FlightSearchForm";
import LoginRedirectButton from "../components/LoginRedirectButton";
=======
import NavBar from "../components/landingpage/NavBar";
import FlightSearchForm from "../components/landingpage/FlightSearchForm";
import HeroSection1 from "../components/landingpage/HeroSection1";
import HeroSection2 from "../components/landingpage/HeroSection2";
import CardSection from "../components/landingpage/CardSection";
import CardSection2 from "../components/landingpage/CardSection2";
import FooterSection from "../components/landingpage/FooterSection";
>>>>>>> 7891a5be5a1e4d8bde23106d7e323b522419bfc1

const SectionWrapper = styled("div")({
  paddingTop: 50,
  paddingBottom: 30,
});

// =============================|| LANDING PAGE MAIN ||============================= //

const Landing = () => {
<<<<<<< HEAD


  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    cabinClass: "Economy",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // TODO: Send formData to an API endpoint
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
      <LoginRedirectButton></LoginRedirectButton>
        <Box textAlign="center" my={4}>
          <Image
            src="/skyscoutlogo.png"
            alt="SkyScout Logo"
            width={180}
            height={180}
            priority
          />
=======
  return (
    <ThemeProvider theme={theme}>
      {/* Nav Bar*/}
      <NavBar />
      {/*Search Component*/}
      <SectionWrapper>
        <FlightSearchForm />
      </SectionWrapper>
>>>>>>> 7891a5be5a1e4d8bde23106d7e323b522419bfc1

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
