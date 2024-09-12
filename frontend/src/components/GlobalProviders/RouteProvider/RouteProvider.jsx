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
import { CommentDialogPaginated } from "@frontend-ui/components/Comment/";
import { Button, Container, Grid, Stack } from "@mui/material";
import { Profile } from "@frontend-ui/components/Profile/Profile";
import { Box } from "@mui/system";
import { HeaderProvider } from "@frontend-ui/components/Header";
import ProfileSettingLayout from "@frontend-ui/components/ProfileSettingLayout";
import ProfileVisitorView from "@frontend-ui/components/Profile/ProfileVisitorView";
import { TermsAndConditions } from "@frontend-ui/components/Profile/ProfileVisitorView/TermsAndConditions";
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
          {/* <Route
            path="/"
            element={
              <Landing />
            }
          /> */}
          <Route path="/" element={<Landing />} />

          {/* Optionally, you can keep the /auth route if needed */}
          <Route path="/auth" element={<AuthPageProvider />} />
          <Route path="/profile-setting" element={<ProfileSettingLayout />} />
          <Route path="/profile-visitor" element={<ProfileVisitorView />} />
          <Route path="/terms" component={TermsAndConditions} />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;
