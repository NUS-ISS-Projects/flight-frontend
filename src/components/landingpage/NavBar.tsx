"use client";

import { cloneElement, ReactElement } from "react";
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
import AccountProfile from "../ui-component/accountMenu";
import useAuth from "@/hooks/useAuth";

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
  const { isLoggedIn } = useAuth();
  return (
    <ElevationScroll {...others}>
      <MuiAppBar sx={{ backgroundColor: "#fffffe" }}>
        <Container>
          <Toolbar sx={{ py: 1.0, px: `0 !important` }}>
            <Typography
              component={Link}
              href="/"
              sx={{ flexGrow: 1, textAlign: "left" }}
            >
              <Image
                src="/skyscoutlogo-menu.svg"
                alt="Logo"
                style={{ width: "auto", height: "50px" }}
                width={200}
                height={200}
                priority
              />
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "flex" } }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              {!isLoggedIn ? (
                <>
                  <Button
                    component={Link}
                    href="/login"
                    disableElevation
                    variant="contained"
                    color="secondary"
                    sx={{
                      color: "black",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "#DCDCDC",
                      },
                      fontWeight: "bold",
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/register"
                    sx={{ fontWeight: "bold" }}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <AccountProfile />
              )}
            </Stack>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default NavBar;
