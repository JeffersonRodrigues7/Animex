import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/homeIndex";
import LoginPage from "./pages/LoginPage/loginIndex";
import RegisterPage from "./pages/RegisterPage/registerIndex";
import { AuthProvider, AuthContext } from "./contexts/contextAuth";

const AppRoutes = () => {
    const Private = ({ children }: any) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/login"></Navigate>;
        }

        return children;
    };

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <Private>
                                <HomePage />
                            </Private>
                        }
                    />
                    <Route path="/register" element={<RegisterPage />}></Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
