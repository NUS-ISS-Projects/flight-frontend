import React, { useState, useEffect } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Grid,
  Stack,
  IconButton,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";

// project imports
import SubCard from "../ui-component/cards/SubCard";

// third-party
import jwtDecode from "jwt-decode";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

// ==============================|| ACCOUNT PROFILE - SECURITY ||============================== //

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterNewPassword, setReenterNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewReEnterPassword, setShowReEnterPassword] =
    React.useState(false);

  const handleCurrentPasswordChange = (event: any) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
  };

  const handleReenterNewPasswordChange = (event: any) => {
    setReenterNewPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowReEnterPassword = () => {
    setShowReEnterPassword(!showNewReEnterPassword);
  };

  const handleSubmit = async () => {
    if (newPassword !== reenterNewPassword) {
      setPasswordsMatch(false);
      return;
    }

    const sessionUsername = localStorage.getItem("sessionUsername");
    try {
      const passwordChange = await axios.put(
        `${API_URL}/user/change-password/${sessionUsername}`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        }
      );

      if (passwordChange.status === 200) {
        alert("Password changed successfully");
        console.log("Update change");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            alert("Current Password is incorrect");
          } else {
            alert("Error: " + error.response.data.message);
          }
        } else if (error.request) {
          console.log(error.request);
          alert("No response from the server");
        } else {
          console.log("Error", error.message);
          alert("Error: " + error.message);
        }
      } else {
        console.error("Error", error);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SubCard title="Change Password">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormHelperText>Current Password</FormHelperText>
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
                <Grid item xs={6}>
                  <FormHelperText>New Password</FormHelperText>
                  <OutlinedInput
                    id="outlined-basic10"
                    type={showNewPassword ? "text" : "password"}
                    fullWidth
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                          size="large"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormHelperText>Re-enter New Password</FormHelperText>
                  <OutlinedInput
                    id="outlined-basic11"
                    type={showNewReEnterPassword ? "text" : "password"}
                    fullWidth
                    value={reenterNewPassword}
                    onChange={handleReenterNewPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowReEnterPassword}
                          edge="end"
                          size="large"
                        >
                          {showNewReEnterPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                {!passwordsMatch && (
                  <Grid item xs={12}>
                    <FormHelperText
                      sx={{
                        backgroundColor: "#f8d7da",
                        border: "1px solid #f5c6cb",
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#721c24",
                        textAlign: "center",
                      }}
                    >
                      Passwords do not match
                    </FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Stack direction="row">
                    <Button
                      variant="contained"
                      sx={{ fontWeight: "bold" }}
                      onClick={handleSubmit}
                    >
                      Change Password
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
