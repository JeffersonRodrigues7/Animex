import { useContext } from "react";
import { AuthContext } from "../../contexts/contextAuth";

const HomePage = () => {
    const { logout, authenticated } = useContext(AuthContext);

    const handleLogout = () => {
        if (logout) {
            logout();
        }
    };

    return (
        <>
            <h1>Home Page</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default HomePage;
