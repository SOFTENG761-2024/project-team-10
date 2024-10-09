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
  CircularProgress,
  GlobalStyles,
} from '@mui/material';

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
  backgroundColor: "#4b5a68",
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: "center",
  color: "white",
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
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
  borderRadius: theme.spacing(2),
}));

const LinkedInButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  background: "#D6D8D9",
  borderRadius: theme.spacing(3),
  outline: "none",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
}));


const SigninPageContext = createContext({});

export const useSigninPage = () => useContext(SigninPageContext);

const SigninPageProvider = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { get, post, setError } = useAPI();

  const handleCreateProfessionalAccount = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/tuakiri`;
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
        } else if (response && response.data === false) {
          window.location.href = '/create-account';
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
    <SigninPageContext.Provider value={{}}>
      <GlobalStyles styles={styles.global} />
      <Container maxWidth="md">
        {
          loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
              <CircularProgress />
            </Box>
          ) : (
            <><StyledPaperTop elevation={3}>
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
                        // variant="filled"
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
                        // variant="filled"
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
      </Container></SigninPageContext.Provider>
  );
};

export default SigninPageProvider;

const styles = {
  global: {
    html: {
      height: "100%",
      margin: 0,
      padding: 0,
    },
    body: {
      width: "100%",
      height: "100vh",
      margin: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "960px",
    height: "600px",
  },
  typographyBody: {
    mt: "25px",
    display: "flex",
    fontFamily: "Ramaraja",
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "center",
    padding: 2,
  },

  supportText: {
    fontSize: "19px",
    fontFamily: "Ramaraja",
    mt: "30px",
  },
  form: {
    width: "100%",
    height: "45%",
    backgroundColor: "#F1F4F6",
    padding: 5,
    boxSizing: "border-box",
    borderRadius: "0 0 30px 30px",
  },

  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    type: "submit",
    fullWidth: true,
    variant: "contained",
    mt: 1,
    mb: 2,
    backgroundColor: "#4b5a68",
    color: "#fff",
    borderRadius: "25px",
    width: "150px",
    border: "1px solid transparent",

    "&:hover": {
      backgroundColor: "#F1F4F6",
      color: "#4b5a68",
      borderColor: "#4b5a68",
    },
    "&:active": {
      backgroundColor: "#F1F4F6",
      color: "#4b5a68",
      borderColor: "#4b5a68",
    },
  },
};