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
import { useRouter } from "next/router";
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
import { SubNav } from "./SubNav";
import { NavLink } from "./NavLink";

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

  @media (${theme.bp.tabletL}) {
    display: none;
  }
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

  @media (${theme.bp.tabletL}) {
    padding: 30px 50px 30px 50px;
  }
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

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.5rem;
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

export const AppNav: React.FC<{}> = ({ children }) => {
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
            <SubNav title="Menu">
              <NavLink title="Dashboard" href="/open/dashboard">
                <MdDashboard />
              </NavLink>
              <NavLink title="Genres" href="/open/genres">
                <MdLibraryMusic />
              </NavLink>
              <NavLink title="Albums" href="/open/albums">
                <MdAlbum />
              </NavLink>
              <NavLink title="Artists" href="/open/artists">
                <BsPersonFill />
              </NavLink>
            </SubNav>
            <SubNav title="Sharing">
              <NavLink title="Listening Party" href="/open/listening_pary">
                <BsSpeaker />
              </NavLink>
              <NavLink title="Listening Room" href="/open/listening_room">
                <MdPeople />
              </NavLink>
            </SubNav>
            <SubNav title="Library">
              <NavLink title="Recent" href="/open/recent">
                <MdReplay />
              </NavLink>
              <NavLink title="Playlists" href="/open/playlists">
                <MdPlaylistPlay />
              </NavLink>
              <NavLink title="Favorites" href="/open/favorites">
                <GoHeart />
              </NavLink>
            </SubNav>
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
      <div> {children} </div>
    </>
  );
};

export default AppNav;
