import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useAuth from "@/hooks/useAuth";
import useScriptRef from "@/hooks/useScriptRef";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import login from "@/views/login";

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const theme = useTheme();
  const router = useRouter();
  //const { login } = useAuth();

  const scriptedRef = useScriptRef();

  const [checked, setChecked] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };


  const login = async (username: any, password: any) => {
    console.log("Login credentials:", username, password);
    const response = await fetch('http://localhost:8888/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to login'); // Handle error response
    }
    const data = await response.text();
    console.log("Response from server:", data);

  };


  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Username is required"),
      
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values: { username: any; password: any; }, { setErrors, setStatus, setSubmitting }: any) => {
        try {
          login(values.username, values.password);
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err: any) {
          console.error(err);
          if (scriptedRef.current) {631
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl
            fullWidth
            error={Boolean(touched.username && errors.username)}
            sx={{ mb: 2 }}
          >
            <InputLabel htmlFor="outlined-adornment-email-login">
              Email Address / Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="username"
              value={values.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address / Username"
              inputProps={{}}
            />
            {touched.username && errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    sx={{
                      color: "#6246ea", // Color when the checkbox is not checked
                      "&.Mui-checked": {
                        color: "#6246ea", // Color when the checkbox is checked
                      },
                    }}
                  />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component={Link}
                href={"/"}
                color="#6246ea"
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Forgot Password?
              </Typography>
            </Grid>
          </Grid>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{
                backgroundColor: "#6246ea",
                "&:hover": {
                  backgroundColor: "#4431a3",
                },
              }}
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;