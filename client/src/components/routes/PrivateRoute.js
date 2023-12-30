import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import Loading from "./Loading";
import axios from "axios";
export default function PrivateRoute() {
  //context
  const [auth, setAuth] = useAuth();
  //State
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
}
