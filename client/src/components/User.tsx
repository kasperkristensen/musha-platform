import React, { Component } from "react";
import styled from "styled-components";
import {
  useLoginMutation,
  useRegisterMutation,
  useUserQuery,
} from "../generated/graphql";
import { getUserInfo, logout } from "../spotify/api_calls";
import theme from "../styles/theme";
import { loginOrRegister } from "../utils/loginOrRegister";
import { Dashboard } from "./Dashboard";
import IconLoader from "./icons/loader";

const Content = styled.div`
  ${theme.mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  h1 {
    max-width: 800px;
  }

  p {
    max-width: 600px;
  }
`;

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
  };

  componentDidMount() {
    this.getData();
    console.log("User in state: ", this.state.user);
  }

  async getData() {
    try {
      const {
        user,
        followedArtists,
        playlists,
        topArtists,
        topTracks,
      } = await getUserInfo();
      this.setState({
        user,
        followedArtists,
        playlists,
        topArtists,
        topTracks,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks,
    } = this.state;
    return (
      <Content>
        {user ? (
          <Dashboard user={user} playlists={playlists} tracks={topTracks} />
        ) : (
          <IconLoader />
        )}
      </Content>
    );
  }
}

export default User;
