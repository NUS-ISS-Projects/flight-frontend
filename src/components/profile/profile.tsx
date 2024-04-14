"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubCard from "../ui-component/cards/SubCard";

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

const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

const ProfileTab = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateDetails = async () => {
    try {
      const sessionUsername = localStorage.getItem("sessionUsername");
      const response = await axios.put(
        `${API_URL}/user/editProfile/${sessionUsername}`,
        {
          name,
          userName,
          email,
        }
      );
      if (response.status === 200) {
        alert("Profile updated successfully");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  useEffect(() => {
    try {
      const sessionUsername = localStorage.getItem("sessionUsername");
      axios
        .get(`${API_URL}/user/userProfile/${sessionUsername}`)
        .then((response) => {
          setName(response.data.name);
          setUserName(response.data.userName);
          setEmail(response.data.email);
          console.log(response.data);
        });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
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
              <TextField
                id="fullName-field"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Username</FormHelperText>
              <TextField
                id="userName-field"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Email</FormHelperText>
              <TextField
                id="email-field"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleUpdateDetails}
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