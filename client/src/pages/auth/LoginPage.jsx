import React from "react";
import Login from "../../components/auth/Login";
import usePageTitle from "../../shared/hooks/usePageTitle";
const LoginPage = () => {
  usePageTitle("login")
  return <Login />;
};

export default LoginPage;
