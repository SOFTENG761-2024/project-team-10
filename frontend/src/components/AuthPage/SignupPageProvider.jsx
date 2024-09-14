import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Paper,
  Grid,
  Container,
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
  height: '300px', // Set a fixed height for the divider
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
  minHeight: '50vh',
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

const SignupPageContext = createContext({});

export const useSignupPage = () => useContext(SignupPageContext);

const SignupPageProvider = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');


  const handleCreateProfessionalAccount = () => {
    window.location.href = 'https://www.reannz.co.nz';
  };

  const handleCreateBusinessAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/create-business-account', {
        firstName,
        lastName,
        organization,
        email,
      });
      alert('Business account created successfully!');
    } catch (error) {
      console.error('Error creating business account:', error);
      alert('Failed to create business account. Please try again.');
    }
  };

  const handleCreateLinkedInAccount = () => {
    console.log('Creating account with LinkedIn');
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: '86yqr14akub4tu',
    //import.meta.env.VITE_BACKEND_API_BASE_URL,
    redirectUri: `http://localhost:5173/signup`,
    // `http://localhost:5173/signup`,
    scope: 'profile email',
    // state: 'DCEeFWf45A53sdfKef424',
    onSuccess: (code) => {
      alert(code);
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    let windowUrl = window.location.href
    if (windowUrl.includes('code=')) {
      let codeMatch = windowUrl.match(/code=([a-zA-Z0-9_\\-]+)/)
      axios.get('backend/signup', {
        headers: {
          auth_code: codeMatch[1]
        }
      })
        .then(res => {
          console.log(res.data)

        })
        .catch(console.log)
    }

  }, [])


  return (
    <SignupPageContext.Provider value={{}}>
      <Container maxWidth="md">
        <StyledPaperTop elevation={3} sx={{ backgroundColor: mainColor, color: primaryColor }}>
          <Box mt="1">
            <Typography variant="h6" gutterBottom>
              Create a professional account
            </Typography>
          </Box>
          <Box sx={{
            flexGrow: 1, display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            <Typography variant="body1" paragraph align="center">
              Institutional members can sign up with their institutional ID through www.reannz.co.nz
            </Typography>
            <StyledButton
              variant="contained"
              onClick={handleCreateProfessionalAccount}
            >
              Create account with Reannz
            </StyledButton>
          </Box>
          {/* <Box mt={2}>
            <Typography variant="body2">
              Already have a professional Account? <Link href="signin">Sign in</Link>
            </Typography>
          </Box> */}
        </StyledPaperTop>

        <StyledPaperBottom elevation={3} sx={{ backgroundColor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            Create a business account
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Typography variant="body1" paragraph align="center">
                Non members can create account through their business ID
              </Typography>
              <form onSubmit={handleCreateBusinessAccount}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="first-name"
                      label="First Name"
                      variant="outlined"
                      margin="normal"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="last-name"
                      label="Last Name"
                      variant="outlined"
                      margin="normal"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  id="organization"
                  label="Organization"
                  variant="outlined"
                  margin="normal"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Box display="flex" justifyContent="center">
                  <SubmitButton type="submit" variant="contained">
                    Create account
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
                  style={{ maxWidth: '180px', cursor: 'pointer' }}
                />

                {/* <LinkedInButton
                variant="contained"
                color="primary"
                onClick={handleCreateLinkedInAccount}
              >
                Create account with LinkedIn
              </LinkedInButton> */}
              </Box>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Already have a business Account? <Link href="signin">Sign in</Link>
            </Typography>
          </Box>
        </StyledPaperBottom>
      </Container>
    </SignupPageContext.Provider>

  );
};

export default SignupPageProvider;