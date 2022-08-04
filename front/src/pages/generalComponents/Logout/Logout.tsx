import { useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/contextAuth";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(function () {
      if (logout) {
        logout();
      }
    }, 0);
  }, []);

  return <div>Saindo...</div>;
};

export default Logout;
