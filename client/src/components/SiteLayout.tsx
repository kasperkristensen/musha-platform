//TODO: Implement

import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Link from "next/link";
import { FaSpotify, FaChevronDown } from "react-icons/fa";
import { loaderDelay, navDelay } from "../utils/constants";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const StyledHeader = styled.header`
  ${theme.mixins.flexBetween}
  width: 100%;
  flex-direction: row;
  position: fixed;
  padding: 0 50px 0 50px;
  align-items: center;
  height: 100px;
  top: 0;

  .logo {
    ${theme.mixins.flexCenter}
    font-size: var(--fz-lg);
    font-weight: 600;

    a {
      color: var(--black);
      transition: var(--transition);

      &:hover {
        color: var(--blue);
      }
    }

    img {
      margin-right: 7px;
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  color: var(--darkgrey);

  @media (max-width: 768px) {
    display: none;
  }

  .login {
    ${theme.mixins.flexCenter}
    .spotify_logo {
      margin-right: 5px;
      transition: var(--transition);
    }
    margin: 0 5px;
    padding: 10px;

    &:hover {
      .spotify_logo {
        color: #1db954;
      }
    }
  }

  ol {
    ${theme.mixins.flexCenter};
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      margin: 0 5px;
      position: relative;
      font-size: var(--fz-xs);
      a {
        padding: 10px;
        text-decoration: none;
        color: var(--darkgrey);
        transition: var(--transition);

        &:hover {
          color: var(--black);
        }
      }
    }
  }
`;

const StyledUser = styled.div`
  ${theme.mixins.flexCenter}

  img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
  }

  .icon {
    width: 10px;
    height: 10px;
    color: var(--grey);
  }
`;

interface NavBarProps {
  display_name: string;
  avatar?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  children,
  display_name,
  avatar,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <>
      <StyledHeader>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
          <Link href="/">music</Link>
        </div>
        <StyledLinks>
          <ol>
            <li>
              <Link href="/login">Discover</Link>
            </li>
            <li>
              <Link href="/login">About</Link>
            </li>
            <li>
              {display_name ? (
                <StyledUser>
                  {avatar ? <img src={avatar} alt="small avatar" /> : null}
                  <a>{display_name}</a>
                  <FaChevronDown className="icon" />
                </StyledUser>
              ) : (
                <a href="http://localhost:4000/login">
                  <div className="login">
                    <FaSpotify className="spotify_logo" />
                    <p>Sign In With Spotify</p>
                  </div>
                </a>
              )}
            </li>
          </ol>
        </StyledLinks>
      </StyledHeader>
    </>
  );

  const items = [one];

  return (
    <>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadedown" timeout={loaderDelay}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
      <main>{children}</main>
    </>
  );
};

export default NavBar;
