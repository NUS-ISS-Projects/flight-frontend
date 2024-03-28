"use client";

import { cloneElement, ReactElement, useContext } from "react";
import Image from "next/image";

// material-ui
import {
  AppBar as MuiAppBar,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import LogoutButton from "../authentication/AuthLogOut";

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}



function ElevationScroll({ children, window }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

// ==============================|| NAV BAR ||============================== //

const NavBar = ({ ...others }) => {
  return (
    <ElevationScroll {...others}>
      <MuiAppBar sx={{ backgroundColor: "#fffffe" }}>
        <Container>
          <Toolbar sx={{ py: 1.0, px: `0 !important` }}>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
              <Image
                src="/skyscoutlogo-menu.svg"
                alt="Logo"
                style={{ height: "50px" }}
                width={200}
                height={200}
              />
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "block" } }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              <Button
                color="inherit"
                component={Link}
                href="/"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#DCDCDC",
                  },
                  fontWeight: "bold",
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/register"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#DCDCDC",
                  },
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Button>
              <Button
                component={Link}
                href="/login"
                disableElevation
                variant="contained"
                color="secondary"
                sx={{ fontWeight: "bold" }}
              >
                Log in
              </Button>
              <Button
                component={Link}
                href="/profile"
                disableElevation
                variant="contained"
                color="secondary"
                sx={{ fontWeight: "bold" }}
              >
                Profile
              </Button>
              <LogoutButton/>
            </Stack>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default NavBar;
