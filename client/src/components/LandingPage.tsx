import React, { Component, useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import styled from "styled-components";
import theme from "../styles/theme";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { loaderDelay, navDelay } from "../utils/constants";

const Content = styled.div`
  ${theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;

  h1 {
    max-width: 800px;
  }

  p {
    max-width: 600px;
  }
`;

const ConnectButton = styled.div`
  ${theme.mixins.flexCenter}
  ${theme.mixins.smallButton}
  margin-top: 1rem;
  .logo {
    margin-right: 10px;
    font-size: var(--fz-lg);
    transition: var(--transition);
  }

  &:hover {
    .logo {
      color: #1db954;
    }
  }
`;

const Message = styled.p`
  font-size: var(--fz-xxxs);
  color: var(--grey);
  margin-top: 15px;

  a {
    text-decoration: underline;
    color: var(--grey);
  }
`;

const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <h1 className="big-heading">Alone it’s music, together it’s magic.</h1>
  );
  const two = (
    <p>
      musha is a platform for sharing and discovering music, with those around
      us. Set up a listening party, and let everyone around you pitch in with
      wich music to listen to next, or discover new music by yourself based on
      your listening history and current mood.
    </p>
  );
  const three = (
    <a href="http://localhost:4000/login">
      <ConnectButton>
        <FaSpotify className="logo" />
        <p className="buttonText">Connect Spotify Premium</p>
      </ConnectButton>
    </a>
  );
  const four = (
    <Message>
      Log in to play music. <a>Why do I need Premium?</a>
    </Message>
  );

  const items = [one, two, three, four];

  return (
    <Content>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Content>
  );
};

export default LandingPage;
