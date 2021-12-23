import React, { useEffect } from "react";
import axiosInstance from "../../axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.clear();
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/login");
    window.location.reload();
  });
  return <div>Logout</div>;
}
