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

const FauxPlayer = styled.div`
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  background-color: white;
  height: 70px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
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
          {/* {token ? <FauxPlayer /> : null} */}
        </AppContainer>
      </>
    );
  }
}

export default App;
