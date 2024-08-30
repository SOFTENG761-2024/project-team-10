import React, { useState } from 'react';
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
import { Password } from '@mui/icons-material';
import { color } from '@mui/system';

const mainColor = "#4b5a68";
const primaryColor = "#d7d7d7";
const OrDivider = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '&::before': {
    marginRight: theme.spacing(1),
  },
  '&::after': {
    marginLeft: theme.spacing(1),
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

const AccountCreationPage = () => {
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
    redirectUri: `https://www.linkedin.com/developers/tools/oauth/redirect`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
        <Box mt={2}>
          <Typography variant="body2" >
            {`Don't have an account?`} <Link sx={{ color: primaryColor }} href="signup">Create account</Link>
          </Typography>
        </Box>
      </StyledPaperTop>

      <StyledPaperBottom elevation={3} sx={{ backgroundColor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          Sign in with business account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph align="center">
              Non members can sign in with their business ID
            </Typography>
            <form onSubmit={handleCreateBusinessAccount}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
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
          <Grid item xs={12} md={6}>
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
            <Box mt={2} display="flex" justifyContent="center">
              <OrDivider variant="body2">
                Or
              </OrDivider>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" mt={2}>
                <img
                  onClick={linkedInLogin}
                  src={linkedin}
                  alt="Sign in with Linked In"
                  style={{ maxWidth: '180px', cursor: 'pointer' }}
                />
              </Box>
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

export default AccountCreationPage;