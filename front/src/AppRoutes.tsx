import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CommunityPage from "./pages/CommunityPage/CommunityPageIndex";
import LoginPage from "./pages/LoginPage/LoginPageIndex";
import RegisterPage from "./pages/RegisterPage/RegisterPageIndex";
import ProfilePage from "./pages/ProfilePage/ProfilePageIndex";
import TopicPage from "./pages/TopicPage/TopicPageIndex";
import Logout from "./pages/generalComponents/Logout/Logout";
import { AuthProvider, AuthContext } from "./contexts/contextAuth";

const AppRoutes = () => {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/"></Navigate>;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />}></Route>
          <Route
            path="/:page"
            element={
              <Private>
                <CommunityPage />
              </Private>
            }
          />
          <Route
            path="/topic/:topicTitle/:topicId/:page"
            element={
              <Private>
                <TopicPage />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <ProfilePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
