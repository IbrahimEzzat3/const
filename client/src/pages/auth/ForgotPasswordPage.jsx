import React from "react";
import ForgotPassword from "../../components/auth/ForgotPassword";
import usePageTitle from "../../shared/hooks/usePageTitle";
const ForgotPasswordPage = () => {
  usePageTitle("forgot");
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
