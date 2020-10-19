import React, { useRef } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import IconUser from "./icons/IconUser";
import IconLoader from "./icons/loader";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Test } from "./Test";
import { useRouter } from "next/router";

const ControllerContainer = styled.div`
  ${theme.mixins.flexBetween}
  align-items: center;
  width: 100%;
  h3 {
  }

  .chevrons {
    ${theme.mixins.flexBetween}
  }
`;

const PlaylistsContainer = styled.div`
  ${theme.mixins.flexCenter};
  justify-content: flex-start;
  max-width: 100%;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox  */

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }
`;

const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 1rem;
`;

const PlaylistImage = styled.img`
  object-fit: contain;
  width: 150px;
  height: 150px;
`;
const PlaylistCover = styled.a`
  position: relative;
  width: 100%;
`;

const PlaceholderArtwork = styled.div`
  ${theme.mixins.flexCenter};
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: var(--grey);
  svg {
    width: 50px;
    height: 50px;
  }
`;
const PlaceholderContent = styled.div`
  ${theme.mixins.flexCenter};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const PlaylistName = styled.a`
  display: inline;
  border-bottom: 1px solid transparent;
  color: var(--black);
  transition: var(--transition);
  font-size: var(--fz-xs);
  &:hover,
  &:focus {
    border-bottom: 1px solid var(--grey);
  }
`;
const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  font-size: var(--fz-xxxs);
  color: var(--grey);
  letter-spacing: 1px;
`;

interface DashboardProps {
  user: any;
  playlists: any;
  tracks: any;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const router = useRouter();
  const user = props.user;
  const playlists = props.playlists;
  const tracks = props.tracks;

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <>
      <ControllerContainer>
        <h3>Your Playlists</h3>
        <div className="chevrons">
          <HiChevronLeft onClick={() => scroll(-150)} />
          <HiChevronRight onClick={() => scroll(150)} />
        </div>
      </ControllerContainer>
      <PlaylistsContainer ref={ref}>
        {playlists ? (
          playlists.items.map(({ id, images, name, tracks }, i) => (
            <Playlist key={i}>
              <PlaylistCover href={id}>
                {images.length ? (
                  <PlaylistImage src={images[0].url} alt="Album Art" />
                ) : (
                  <PlaceholderArtwork>
                    <PlaceholderContent></PlaceholderContent>
                  </PlaceholderArtwork>
                )}
              </PlaylistCover>
              <div>
                <PlaylistName href={id}>{name}</PlaylistName>
                <TotalTracks>{tracks.total} Tracks</TotalTracks>
              </div>
            </Playlist>
          ))
        ) : (
          <IconLoader />
        )}
      </PlaylistsContainer>
      <Test />
      <button onClick={() => router.push("/open")}>Go to app</button>
    </>
  );
};
