import React from "react";
import Register from "../../components/auth/Register";
import usePageTitle from "../../shared/hooks/usePageTitle";
const RegisterPage = () => {
  usePageTitle("register")
  return <Register />;
};

export default RegisterPage;
