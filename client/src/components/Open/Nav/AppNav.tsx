import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import Link from "next/link";
import {
  MdDashboard,
  MdReplay,
  MdPlaylistPlay,
  MdPeople,
  MdAlbum,
  MdLibraryMusic,
  MdClose,
} from "react-icons/md";
import { BsSpeaker, BsPersonFill, BsSearch } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import {
  getAvailableDevices,
  getCurrentPlayback,
  getUser,
} from "../../../spotify/api_calls";
import { Dropdown } from "./Dropdown";
import { Player } from "../Player";

const Container = styled.nav`
  ${theme.mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  text-align: left;
  align-items: flex-start;
  padding-left: 50px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const StyledNavigation = styled.div`
  width: 100%;
`;

const ControllerContainer = styled.div`
  ${theme.mixins.flexBetween};
  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(249, 249, 249, 1) 20%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(249, 249, 249, 1) 20%
  );
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(249, 249, 249, 1) 20%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#f9f9f9",GradientType=1);
  position: fixed;
  top: 0;
  left: 0;
  padding: 30px 50px 30px 280px;
  width: 100%;
  z-index: 999;
`;

const Logo = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  font-size: var(--fz-lg);
  font-weight: 600;

  a {
    color: var(--black);
    transition: var(--transition);
  }

  img {
    margin-right: 7px;
  }
`;

const IconContainer = styled.div`
  ${theme.mixins.flexCenter}
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  margin-right: 10px;

  &:hover,
  &:focus,
  &.active {
    color: var(--blue);
  }

  .icon {
    width: 14px;
    height: 14px;
    color: var(--black);
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.5rem;
`;

const MenuItem = styled.div`
  width: 100%;
  .title {
    color: var(--darkgrey);
    font-weight: 600;
    font-size: var(--fz-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ul {
    padding: 0;
    list-style-type: none;
    width: 100%;
  }

  ul li {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: var(--fz-xxs);
    transition: var(--transition);
    border-right: 3px solid transparent;
    padding: 10px 0;
    width: 100%;
    height: 100%;
    .icon-container {
      transition: var(--transition);
    }

    &:hover,
    &:focus,
    &.active {
      color: var(--blue);
      border-right: 3px solid var(--blue);

      .icon-container .icon {
        color: var(--blue);
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

  a {
    margin-left: 10px;
    font-size: var(--fz-xs);
  }

  .icon {
    width: 10px;
    height: 10px;
    color: var(--grey);
    margin-left: 5px;
  }
`;

const StyledSearch = styled.div`
  ${theme.mixins.flexBetween}
  padding: 0 10px 0 10px;
  width: 180px;
  height: 32px;
  border-radius: 32px;
  border: 1px solid var(--grey);
  background-color: white;
  transition: var(--transition);
  input {
    border: none;
    width: 85%;
    font-family: "Poppins", sans-serif;
    padding-top: 3px;
    &:focus,
    &.active {
      outline: none;
    }
  }

  .icon {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
`;

export const AppNav: React.FC<{}> = ({}) => {
  const [state, setState] = useState({
    user: null,
    devices: null,
  });
  const [device, setDevice] = useState({
    currentDevice: undefined,
    currentTrack: undefined,
    playStatus: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      const devices = await getAvailableDevices();
      setState({
        user: data?.data,
        devices: devices?.data,
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDevice = async () => {
      const playbackInfo = await getCurrentPlayback();
      setDevice({
        currentDevice:
          playbackInfo.data && playbackInfo.data.device
            ? playbackInfo.data.device.name
            : "No Active Device",
        currentTrack:
          playbackInfo.data && playbackInfo.data.item
            ? playbackInfo.data.item
            : null,
        playStatus: playbackInfo.data ? playbackInfo.data.is_playing : false,
      });
    };
    fetchDevice();
    const interval = setInterval(() => fetchDevice(), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    const fetchData = async () => {
      const devices = await getAvailableDevices();
      setState({
        ...state,
        devices: devices?.data,
      });
    };
    fetchData();
  };

  let user;
  if (typeof state.user !== "undefined" && state.user !== null) {
    user = state.user;
  } else {
    user = "";
  }

  let devices;
  if (typeof state.devices !== "undefined" && state.devices !== null) {
    devices = state.devices;
  } else {
    devices = "";
  }
  return (
    <>
      <ControllerContainer>
        <StyledSearch>
          <BsSearch className="icon" />
          <input placeholder="Search" />
          <MdClose />
        </StyledSearch>
        {user ? (
          <StyledUser>
            {user.images.length > 0 ? (
              <img src={user.images[0].url} alt="small avatar" />
            ) : null}
            <a>{user.display_name}</a>
            <FaChevronDown className="icon" />
          </StyledUser>
        ) : null}
      </ControllerContainer>
      <Container>
        <StyledNavigation>
          <Logo>
            <img src="/logo.svg" alt="logo" />
            <Link href="/">musha</Link>
          </Logo>
          <Menu>
            <MenuItem>
              <p className="title">Discover</p>
              <ul>
                <li>
                  <IconContainer className="icon-container">
                    <MdDashboard className="icon" />
                  </IconContainer>
                  Dashboard
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <MdLibraryMusic className="icon" />
                  </IconContainer>
                  Genres
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <MdAlbum className="icon" />
                  </IconContainer>
                  Albums
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <BsPersonFill className="icon" />
                  </IconContainer>
                  Artist
                </li>
              </ul>
            </MenuItem>
            <MenuItem>
              <p className="title">Sharing</p>
              <ul>
                <li>
                  <IconContainer className="icon-container">
                    <BsSpeaker className="icon" />
                  </IconContainer>
                  Listening Party
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <MdPeople className="icon" />
                  </IconContainer>
                  Listening Room
                </li>
              </ul>
            </MenuItem>
            <MenuItem>
              <p className="title">Library</p>
              <ul>
                <li>
                  <IconContainer className="icon-container">
                    <MdReplay className="icon" />
                  </IconContainer>
                  Recent
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <MdPlaylistPlay className="icon" />
                  </IconContainer>
                  PlayLists
                </li>
                <li>
                  <IconContainer className="icon-container">
                    <GoHeart className="icon" />
                  </IconContainer>
                  Favourites
                </li>
              </ul>
            </MenuItem>
          </Menu>
        </StyledNavigation>
        <Dropdown
          placeholder="No Avtive Device"
          value={device.currentDevice}
          onChange={(d) =>
            setDevice({
              ...device,
              currentDevice: d,
            })
          }
          update={() => handleClick()}
          options={
            devices.devices && devices.devices.length > 0 ? devices.devices : []
          }
          direction="up"
        />
      </Container>
      {device.currentTrack && typeof device.currentTrack !== "undefined" ? (
        <Player track={device.currentTrack} playStatus={device.playStatus} />
      ) : null}
    </>
  );
};

export default AppNav;
