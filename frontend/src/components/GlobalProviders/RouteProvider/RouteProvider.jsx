import { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../AuthProvider";
import AuthPageProvider from "@frontend-ui/components/AuthPage/AuthPageProvider";
import { Landing } from "@frontend-ui/components/Recommendation";
import { Button, Container, Grid, Stack } from "@mui/material";
import SigninPageProvider from "@frontend-ui/components/AuthPage/SigninPageProvider";
import SignupPageProvider from "@frontend-ui/components/AuthPage/SignupPageProvider";
import { Box } from "@mui/system";
import { HeaderProvider } from "@frontend-ui/components/Header";
import ProfileSettingLayout from "@frontend-ui/components/ProfileSettingLayout";
import ProfileVisitorView from "@frontend-ui/components/Profile/ProfileVisitorView";
import { TermsAndConditions } from "@frontend-ui/components/Profile/ProfileVisitorView/TermsAndConditions";
import AccountCreation from "@frontend-ui/components/LinkedInAccountCreation/LinkedInAccountCreation";
import { SearchProfile } from "../../SearchProfile";
import LinkedinAdminVerification from "@frontend-ui/components/LinkedinAdminVerification";
import Dashboard from "@frontend-ui/components/Dashboard/Dashboard";
import EventManagementCalendar from "@frontend-ui/components/Calendar";

const RouteContext = createContext({});

export const useRoute = () => useContext(RouteContext);

const RouteProvider = () => {
  const { isAuthenticated } = useAuth();
  const [pageTitle, setPageTitle] = useState("");
  const GoBackButton = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    );
  };

  const GoForwardButton = () => {
    const navigate = useNavigate();
    const handleGoForward = () => {
      navigate(1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoForward}>
        Go Forward
      </Button>
    );
  };
  return (
    <RouteContext.Provider value={{ pageTitle, setPageTitle }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/authenticated" />
              ) : (
                <AuthPageProvider />
              )
            }
          />

          <Route path="/authenticated" element={<Landing />} />

          {/* Optionally, you can keep the /auth route if needed */}
          {/* <Route path="/auth" element={<AuthPageProvider />} /> */}
          <Route path="/profile-setting" element={<ProfileSettingLayout />} />
          <Route path="/profile-visitor/:id" element={<ProfileVisitorView />} />
          <Route path="/terms" component={TermsAndConditions} />

          <Route path="/signin" element={<SigninPageProvider />} />
          <Route path="/signup" element={<SignupPageProvider />} />
          <Route path="/create-account" element={<AccountCreation />} />
          <Route path="/search-profile" element={<SearchProfile />} />
          <Route
            path="/admin-verification"
            element={<LinkedinAdminVerification />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<EventManagementCalendar />} />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;
