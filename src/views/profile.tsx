"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserProfile } from '@/types/user-profile';
import { styled, useTheme } from "@mui/material/styles";
import NavBar from '@/components/landingpage/NavBar';


const SectionWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.grey[100],
  }));

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('http://localhost:8888/api/userProfile/asd')
        const userData = response.data; // Assuming response.data is in the format { id: string, name: string, email: string, ... }
        console.log(userData)
        // Extract the properties from the string
        const id = userData.match(/id='(.*?)'/)?.[1] || '';
        const name = userData.match(/name='(.*?)'/)?.[1] || '';
        const email = userData.match(/email='(.*?)'/)?.[1] || '';
        const username = userData.match(/userName='(.*?)'/)?.[1] || '';

        const userProfileData: UserProfile = {
            id,
            name,
            email,
            username
        };

        setUserProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
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
    <SectionWrapper>
    <NavBar />
    <div style={{ textAlign: 'center' }}>
      {userProfile ? (
        <div>
          <h1>Welcome, {userProfile.name}!</h1>
          <p>Email: {userProfile.email}</p>
          <p>Username: {userProfile.username}</p>
          {/* Display other user information */}
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <a href="/login">Login</a>
        </div>
      )}
    </div>
    </SectionWrapper>
  );
};

export default ProfilePage;
