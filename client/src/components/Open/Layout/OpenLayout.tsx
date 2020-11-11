import React, { useContext, useEffect, useState } from "react";
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
  getSavedObjects,
  getUser,
  useGetPlayBackWatcher,
} from "../../../spotify/api_calls";
import { Dropdown } from "./Dropdown";
import { Player } from "./Player";
import { SubNav } from "./SubNav";
import { NavLink } from "./NavLink";
import querystring from "querystring";
import { GlobalContext } from "../../../contexts/playbackContext";
import {
  contextInterface,
  currentlyPlayingContext,
  savedInterface,
} from "../../../types/spotify/objectInterfaces";
import IconLoader from "../../icons/loader";

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
  background-color: rgb(45, 46, 50);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;

  @media (${theme.bp.tabletL}) {
    display: none;
  }
`;

const StyledNavigation = styled.div`
  width: 100%;
`;

const Content = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 90px 50px 50px 280px;
  background-color: rgb(37, 38, 42);
  overflow: hidden;

  @media (${theme.bp.tabletL}) {
    padding: 90px 50px 90px 50px;
  }
`;

const ControllerContainer = styled.div`
  ${theme.mixins.flexBetween};
  background-color: var(--darkblack);
  position: fixed;
  top: 0;
  left: 0;
  padding: 30px 50px 30px 280px;
  width: 100%;
  z-index: 9;

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
    color: var(--mainColor);
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
  background-color: var(--liteblack);
  transition: var(--transition);
  input {
    border: none;
    width: 85%;
    background-color: var(--liteblack);
    color: white;
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

export const OpenLayout: React.FC = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    devices: null,
  });

  const [context, setContext] = useState<contextInterface | null>(null);

  const fetchPlayback = async () => {
    const playbackInfo = await getCurrentPlayback();
    const savedInfo = await getSavedObjects();
    setContext({
      playback: playbackInfo.data as currentlyPlayingContext,
      savedObjects: savedInfo,
    });
  };

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

  useEffect(() => {}, []);

  // useEffect(() => {
  //   fetchPlayback();
  //   const interval = setInterval(() => fetchPlayback(), 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    const fetchGlobal = async () => {
      const playbackInfo = await getCurrentPlayback();
      const savedInfo = await getSavedObjects();
      setContext({
        playback: playbackInfo.data as currentlyPlayingContext,
        savedObjects: savedInfo,
      });
    };
    fetchGlobal();
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

  const router = useRouter();

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
    <GlobalContext.Provider value={{ global: context, setGlobal: setContext }}>
      <ControllerContainer>
        {/* <button onClick={() => router.back()}>Go Back</button> */}
        <StyledSearch>
          <BsSearch className="icon" />
          <input
            placeholder="Search"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = { q: e.currentTarget.value };
              router.push(`/open/search/${querystring.stringify(newValue)}`);
            }}
          />
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
            <Link href="/">music</Link>
          </Logo>
          <Menu>
            <SubNav title="Menu">
              <NavLink title="Dashboard" href="/open/dashboard">
                <MdDashboard />
              </NavLink>
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
            <SubNav title="Sharing">
              <NavLink
                title="Listening Party"
                href="/open/sharing/listening_party"
              >
                <BsSpeaker />
              </NavLink>
              <NavLink title="Listening Room" href="/open/listening_room">
                <MdPeople />
              </NavLink>
            </SubNav>
          </Menu>
        </StyledNavigation>
        <Dropdown
          placeholder="No Active Device"
          value={
            context?.playback?.device
              ? context?.playback?.device.name
              : "No Active Device"
          }
          onChange={() => {}}
          update={() => handleClick()}
          options={
            devices.devices && devices.devices.length > 0 ? devices.devices : []
          }
          direction="up"
        />
      </Container>
      <Player />
      <Content> {children} </Content>
    </GlobalContext.Provider>
  );
};

export default OpenLayout;
