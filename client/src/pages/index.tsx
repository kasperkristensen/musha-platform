import React, { useEffect, useState } from "react";
import LandingPage from "../components/LandingPage";
import NavBar from "../components/SiteLayout";
import { getUser } from "../spotify/api_calls";

export default function Home() {
  const [user, setUser] = useState({ displayName: "", avatar: "" });

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUser();
      setUser({
        displayName: userResponse.data.display_name,
        avatar: userResponse.data.images[0].url,
      });
    };
    fetchData();
  }, []);
  return (
    <NavBar display_name={user.displayName} avatar={user.avatar}>
      <LandingPage loggedIn={user.displayName ? true : false} />
    </NavBar>
  );
}
