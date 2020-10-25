import React, { Component } from "react";
import { token } from "../spotify/api_calls";
import styled from "styled-components";
import LandingPage from "./LandingPage";
import NavContainer from "./NavContainer";
import User from "./User";

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class App extends Component {
  state = {
    token: "",
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    return (
      <>
        <NavContainer />
        <AppContainer>
          <main>{token ? <User /> : <LandingPage />}</main>
        </AppContainer>
      </>
    );
  }
}

export default App;
