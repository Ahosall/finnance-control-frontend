import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/auth.hook";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  return token === null ? <></> : <>{children}</>;
};

export default PrivateRoute;
