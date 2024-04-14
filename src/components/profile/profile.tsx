import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserProfile } from "@/types/user-profile";
import SubCard from "../ui-component/cards/SubCard";

import {
  Button,
  Grid,
  Stack,
  TextField,
  FormHelperText,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";

//Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Console } from "console";

const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

const ProfileTab = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    username: "",
  });
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const userNameFromSession = localStorage.getItem("sessionUsername");

  useEffect(() => {
    const userNameFromSession = localStorage.getItem("sessionUsername");
  
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/userProfile/` + userNameFromSession
        );
        const userData = response.data;
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
        setFullName(name);
        setUsername(username);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, [localStorage.getItem("sessionUsername")]);
  

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdateDetails = async () => {
    try {
      console.log("Username:", username);
      const response = await axios.put(
        `${API_URL}/user/editProfile/` + userNameFromSession,
        {
          id: parseInt(userProfile.id ?? '0'),
          name: fullName,
          username: username,
          email: email,
          password: null
        },
      );
      const responseStatus = response.status; 
      console.log(responseStatus);
      // Handle success
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error
    }
    if(newPassword) {
      const newPasswordResponse = await axios.put(
        `${API_URL}/user/change-password/` + userNameFromSession,
        {
          id: parseInt(userProfile.id ?? '0'),
          name: fullName,
          username: username,
          email: email,
          newPassword: newPassword,
          oldPassword: oldPassword
        }
      );
      // Handle response for password change
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormHelperText>Full Name</FormHelperText>
        <TextField
          id="fullName"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormHelperText>Username</FormHelperText>
        <TextField
          id="username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormHelperText>Email</FormHelperText>
        <TextField
          id="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormHelperText>Change Password: New password</FormHelperText>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={newPassword}
          onChange={handleNewPasswordChange}
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
          <FormHelperText>Old Password</FormHelperText>
            <TextField
              id="oldPassword"
              type="password"
              fullWidth
              value={oldPassword}
              onChange={handleOldPasswordChange}
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
  );
};

export default ProfileTab;
