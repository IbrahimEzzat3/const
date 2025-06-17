import React from "react";
import UserManager from "../../components/admin/UserManager";
import usePageTitle from "../../shared/hooks/usePageTitle";

const UserManagerPage = () => {
  usePageTitle("User Management");
  return <UserManager />;
};

export default UserManagerPage;
