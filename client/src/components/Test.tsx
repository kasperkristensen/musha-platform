import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { getUser, getUserInfo } from "../spotify/api_calls";

interface TestProps {}

async function getData() {
  try {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks,
    } = await getUserInfo();
    console.log("User in getData: ", user);
    return { user, followedArtists, playlists, topArtists, topTracks };
  } catch (e) {
    console.error(e);
  }
}

export const Test: React.FC<TestProps> = ({}) => {
  const [state, setState] = useState({
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
  });
  const [, register] = useRegisterMutation();
  const [, login] = useLoginMutation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setState({
        user: data?.user,
        followedArtists: data?.followedArtists,
        playlists: data?.playlists,
        topArtists: data?.topArtists,
        topTracks: data?.topTracks,
      });

      const loginUser = await login({ email: data?.user.email });
      console.log(loginUser.data?.login.errors);
      if (loginUser.data?.login.errors) {
        const registerUser = await register({
          displayName: data?.user.display_name,
          email: data?.user.email,
          spotifyId: data?.user.id,
        });
        console.log("Regsiter: ", registerUser.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>
        {typeof state.user !== "undefined" && state.user !== null
          ? state.user.display_name
          : "did not work..."}
      </p>
    </div>
  );
};
