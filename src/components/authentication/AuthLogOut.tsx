import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';


const LogoutButton = () => {
    const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  return (
    <Button
      component={Link}
      href="/"
      disableElevation
      variant="contained"
      color="secondary"
      sx={{ fontWeight: 'bold' }}
      onClick={handleLogout} // Call handleLogout function on button click
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
