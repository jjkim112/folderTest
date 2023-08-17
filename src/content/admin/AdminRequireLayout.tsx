import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "src/reducer/authSlice";

export const AdminRequireLayout = ({ children }: { children: ReactNode }) => {
  const isAdmin = useAdmin();
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
};
