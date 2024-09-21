import React, { useState, createContext, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { useAPI } from "../GlobalProviders/APIProvider";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Paper,
  Grid,
  Container,
  CircularProgress
} from '@mui/material';

const mainColor = "#4b5a68";
const primaryColor = "#d7d7d7";

const OrDivider = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Change the flex direction to column
  alignItems: 'center',
  justifyContent: 'center',
  // paddingLeft: theme.spacing(10),
  marginLeft: theme.spacing(10),
  height: '200px', // Set a fixed height for the divider
  '&::after': {
    content: '""',
    flex: 1,
    borderLeft: `1px solid ${theme.palette.divider}`, // Use borderLeft for vertical lines
    alignSelf: 'stretch', // Ensure the lines stretch to fill the available space
    marginTop: theme.spacing(1),
  },
}));


const StyledPaperTop = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  minHeight: '30vh',
}));

const StyledPaperBottom = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.common.black,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
  borderRadius: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: mainColor,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
  borderRadius: theme.spacing(2),
}));

const LinkedInButton = styled(Button)(({ theme }) => ({
  backgroundColor: mainColor,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: theme.spacing(5),
}));


const SigninPageContext = createContext({});

export const useSigninPage = () => useContext(SigninPageContext);

const SigninPageProvider = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { get, post, setError } = useAPI();

  const handleCreateProfessionalAccount = () => {
    window.location.href = 'https://www.reannz.co.nz';
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    try {
      post(import.meta.env.VITE_BACKEND_API_BASE_URL + '/api/auth/email-signin', {
        email: email,
        password: password,
      }).then((response) => {
        console.log('response', response);
        if (response && response.data === true) {
          window.location.href = '/search-profile';
        }

      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create business account. Please try again.');
    }
  };

  const handleCreateLinkedInAccount = () => {
    console.log('Creating account with LinkedIn');
  };

  const linkedInLogin = async () => {
    let loginState = null;
    // loginState = get(import.meta.env.VITE_BACKEND_API_BASE_URL + '/api/auth/linkedin').then((response) => {
    //   console.log('response', response);
    // });

    window.location.href = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/auth/linkedin`;
  };

  useEffect(() => {

  }, []);


  return (
    <Container maxWidth="md">
      {
        loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <><StyledPaperTop elevation={3} sx={{ backgroundColor: mainColor, color: primaryColor }}>
            <Box mt="1">
              <Typography variant="h6" gutterBottom>
                Sign in with professional account
              </Typography>
            </Box>
            <Box sx={{
              flexGrow: 1, display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Typography variant="body1" paragraph align="center">
                Institutional members can sign in with their institutional ID through www.reannz.co.nz
              </Typography>
              <StyledButton
                variant="contained"
                onClick={handleCreateProfessionalAccount}
              >
                Sign in with Reannz
              </StyledButton>
            </Box>
          </StyledPaperTop>
            <StyledPaperBottom elevation={3} sx={{ backgroundColor: 'grey.200' }}>
              <Typography variant="h6" gutterBottom>
                Sign in with business account
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Typography variant="body1" paragraph align="center">
                    Sign in with Email
                  </Typography>

                  <form onSubmit={handleEmailSignin}>
                    <StyledTextField
                      fullWidth
                      label="Email"
                      variant="filled"
                      margin="normal"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size='small'
                    />

                    <StyledTextField
                      fullWidth
                      label="Password"
                      variant="filled"
                      margin="normal"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size='small'
                      required />

                    <Box display="flex" justifyContent="center">
                      <SubmitButton type="submit" variant="contained">
                        Sign in
                      </SubmitButton>
                    </Box>
                  </form>

                </Grid>

                <Grid item xs={12} md={1}>
                  <OrDivider variant="body2">
                  </OrDivider>
                </Grid>

                <Grid item xs={12} md={5}>

                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                    <img
                      onClick={linkedInLogin}
                      src={linkedin}
                      alt="Sign in with Linked In"
                      style={{ maxWidth: '200px', cursor: 'pointer' }} />
                  </Box>

                </Grid>
              </Grid>
              <Box mt={2}>
                <Typography variant="body2" align="center">
                  {`Don't have an account?`} <Link href="signup">Create account</Link>
                </Typography>
              </Box>
            </StyledPaperBottom></>
        )}
    </Container>
  );
};

export default SigninPageProvider;