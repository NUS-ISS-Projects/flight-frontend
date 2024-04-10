"use client";
import React, { ReactElement } from "react";
import theme from "../themes/theme";
import Link from "next/link";
import { styled, ThemeProvider } from "@mui/material/styles";
import NavBar from "@/components/landingpage/NavBar";
import { Box, Tab, Tabs } from "@mui/material";
import LAYOUT from "@/constants";
import Layout from "@/layout";
import MainCard from "@/components/ui-component/cards/MainCard";
import FooterSection from "../components/landingpage/FooterSection";

// types
import { TabsProps } from "@/types";

import Profile from "@/components/profile/profile";
import SavedFlights from "@/components/profile/savedFlight";

const SectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}));

function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <SectionWrapper>
        <NavBar />
        <MainCard sx={{ width: "95%" }}>
          <div>
            <Tabs
              value={value}
              indicatorColor="primary"
              onChange={handleChange}
              sx={{
                mb: 3,
                minHeight: "auto",
                "& button": {
                  minWidth: 100,
                },
                "& a": {
                  minHeight: "auto",
                  minWidth: 10,
                  py: 1.5,
                  px: 1,
                  mr: 2.25,
                  fontWeight: "bold",
                  color: "#6246ea",
                },
                "& a.Mui-selected": {
                  color: "#6246ea",
                  fontWeight: "bold",
                },
              }}
              aria-label="tabs"
              variant="scrollable"
            >
              <Tab
                component={Link}
                href="#"
                label="Profile Information"
                {...a11yProps(0)}
              />
              <Tab
                component={Link}
                href="#"
                label="Saved Flights"
                {...a11yProps(1)}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SavedFlights />
            </TabPanel>
          </div>
        </MainCard>
      </SectionWrapper>
      <FooterSection />
    </ThemeProvider>
  );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant={LAYOUT.auth}>{page}</Layout>;
};

export default ProfilePage;
