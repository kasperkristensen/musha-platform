import React, { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import styled from "styled-components";
import theme from "../styles/theme";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { loaderDelay, navDelay } from "../utils/constants";
import Link from "next/link";

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
    color: var(--darkgrey);
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
  color: var(--darkgrey);
  margin-top: 15px;

  a {
    text-decoration: underline;
    color: var(--darkgrey);
  }
`;

interface LandingPageProps {
  loggedIn: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn }) => {
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
  const three = loggedIn ? (
    <Link href="/open/dashboard">
      <ConnectButton>
        <p className="buttonText">Open Web Player</p>
      </ConnectButton>
    </Link>
  ) : (
    <Link href="http://localhost:4000/login">
      <ConnectButton>
        <FaSpotify className="logo" />
        <p className="buttonText">Connect Spotify Premium</p>
      </ConnectButton>
    </Link>
  );

  const four = !loggedIn ? (
    <Message>
      Log in to play music. <a>Why do I need Premium?</a>
    </Message>
  ) : null;

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
