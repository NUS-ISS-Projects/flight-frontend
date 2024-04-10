"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserProfile } from "@/types/user-profile";
import SubCard from "../ui-component/cards/SubCard";

import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";

//Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ProfileTab = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleCurrentPasswordChange = (event: any) => {
    setCurrentPassword(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userNameFromSession = localStorage.getItem("sessionUsername");
        //console.log(userNameFromSession);
        const response = await axios.post(
          "http://localhost:8888/api/user/userProfile/" + userNameFromSession
        );
        const userData = response.data;
        console.log(userData);
        const id = userData.match(/id='(.*?)'/)?.[1] || "";
        const name = userData.match(/name='(.*?)'/)?.[1] || "";
        const email = userData.match(/email='(.*?)'/)?.[1] || "";
        const username = userData.match(/userName='(.*?)'/)?.[1] || "";

        const userProfileData: UserProfile = {
          id,
          name,
          email,
          username,
        };

        setUserProfile(userProfileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} md={4}>
        <SubCard title={"Welcome!"} contentSX={{ textAlign: "center" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar
                alt="avatar"
                src=""
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                Upload/Change Your Profile Image
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#6246ea",
                  "&:hover": {
                    backgroundColor: "#4431a3",
                  },
                }}
              >
                Upload Avatar
              </Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>

      <Grid item sm={6} md={8}>
        <SubCard title="Edit Account Details">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormHelperText>Full Name</FormHelperText>
              <TextField id="outlined-basic1" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Username</FormHelperText>
              <TextField id="outlined-basic1" fullWidth value="" />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Email</FormHelperText>
              <TextField id="outlined-basic6" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Change Password</FormHelperText>
              <OutlinedInput
                id="outlined-basic9"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#6246ea",
                    "&:hover": {
                      backgroundColor: "#4431a3",
                    },
                  }}
                >
                  Update Details
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
