import { useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/contextAuth";

export const Logout = () => {
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
