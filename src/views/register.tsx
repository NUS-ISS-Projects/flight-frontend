"use client";
import { ReactElement } from "react";

import Image from "next/image";
import React from "react";
import { Typography, useMediaQuery, Grid, Stack, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import LAYOUT from "@/constants";
import Layout from "@/layout";
import RegisterCardWrapper from "@/components/registration/RegisterCardWrapper";
import RegistrationForm from "@/components/registration/RegistrationForm";
import NavBar from "@/components/landingpage/NavBar";

// Define the styled SectionWrapper
const SectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[100],
}));

const RegisterPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SectionWrapper>
      <NavBar />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <RegisterCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 0.5 }}>
                    <Link href="/" aria-label="theme-logo">
                      <Image
                        src="/skyscoutlogo-menu.svg"
                        alt="Logo"
                        style={{ height: "50px" }}
                        width={1080}
                        height={1080}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color="#6246ea"
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h5"}
                            sx={{
                              fontWeight: "bold",
                              fontSize: "18px",
                              textAlign: "center",
                            }}
                          >
                            Hi, welcome to Sky Scout.
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Please register to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <RegistrationForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        href={"/login"}
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Have a account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </RegisterCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};
RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default RegisterPage;
