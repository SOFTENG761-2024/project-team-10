import React, { useState, createContext } from 'react';
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

const SigninPageProvider = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    redirectUri: `http://localhost:5173/signin`,
    scope: 'profile email openid',

    onSuccess: (code) => {
      console.log('LinkedIn login successful, code:', code);
    },
    onError: (error) => {
      console.error('LinkedIn login failed:', error);
    },
  });

  console.log('linkedInLogin function:', linkedInLogin);

  return (
    <Container maxWidth="md">
      <StyledPaperTop elevation={3} sx={{ backgroundColor: mainColor, color: primaryColor }}>
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
        {/* <Box mt={2}>
          <Typography variant="body2" >
            {`Don't have an account?`} <Link sx={{ color: primaryColor }} href="signup">Create account</Link>
          </Typography>
        </Box> */}
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

            <form onSubmit={handleCreateBusinessAccount}>
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

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

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
                style={{ maxWidth: '180px', cursor: 'pointer' }}
              />

              {/* <LinkedInButton
                variant="contained"
                color="primary"
                onClick={handleCreateLinkedInAccount}
              >
                Sign in with LinkedIn
              </LinkedInButton> */}
            </Box>

          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="body2" align="center">
            {`Don't have an account?`} <Link href="signup">Create account</Link>
          </Typography>
        </Box>
      </StyledPaperBottom>
    </Container>
  );
};

export default SigninPageProvider;