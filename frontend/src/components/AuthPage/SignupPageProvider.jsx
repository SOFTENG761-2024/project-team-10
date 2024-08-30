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

const mainColor = "#4b5a68";
const primaryColor = "#d7d7d7";

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
    redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
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
        <Box mt={2}>
          <Typography variant="body2">
            Already have a professional Account? <Link href="signin">Sign in</Link>
          </Typography>
        </Box>
      </StyledPaperTop>

      <StyledPaperBottom elevation={3} sx={{ backgroundColor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          Create a business account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph align="center">
              Non members can create account through their business ID
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
              Create account with LinkedIn
            </Typography>
            <Box display="flex" justifyContent="center">
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
  );
};

export default AccountCreationPage;