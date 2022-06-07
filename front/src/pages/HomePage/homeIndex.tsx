import { useContext } from "react";
import { AuthContext } from "../../contexts/contextAuth";
import Topics from "./components/Topics";

const HomePage = () => {
    const { logout, authenticated } = useContext(AuthContext);

    const handleLogout = () => {
        if (logout) {
            logout();
        }
    };

    return (
        <>
            <h1>Home Page2</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Logout</button>

            <Topics />
        </>
    );
};

export default HomePage;
