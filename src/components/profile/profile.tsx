"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserProfile } from "@/types/user-profile";

import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

//Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProfileTab = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userNameFromSession = localStorage.getItem("sessionUsername");
        console.log(userNameFromSession);
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
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} md={4}>
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
          <Grid item xs={12}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Avatar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={6} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormHelperText>First Name</FormHelperText>
            <TextField id="outlined-basic1" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <FormHelperText>Last Name</FormHelperText>
            <TextField id="outlined-basic1" fullWidth value="" />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Role</FormHelperText>
            <TextField id="outlined-basic6" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Tell us a little bit about yourself</FormHelperText>
            <TextField
              id="accountDescription"
              type="description"
              fullWidth
              multiline={true}
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Update Details</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
