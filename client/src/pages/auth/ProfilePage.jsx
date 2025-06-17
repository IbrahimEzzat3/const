import React from "react";
import Profile from "../../components/auth/Profile";
import usePageTitle from "../../shared/hooks/usePageTitle";
const ProfilePage = () => {
  usePageTitle("profile");

  return <Profile />;
};

export default ProfilePage;
