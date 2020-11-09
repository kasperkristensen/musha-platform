import { useRouter } from "next/router";
import React from "react";
import { BsHeart } from "react-icons/bs";
import styled, { css } from "styled-components";
import { playTrack } from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import { fullTrackObject } from "../../../types/spotify/objectInterfaces";
import {
  concatArtists,
  millisToMinutesAndSeconds,
} from "../../../utils/utilFunctions";
import IconLoader from "../../icons/loader";

const Section = styled.section`
  grid-column: 3/-1;
  position: relative;
  display: block;
`;

const LoadingDiv = styled.div`
  ${theme.mixins.flexCenter}
`;

const Header = styled.div`
  grid-column: 1/-1;
`;

const InnerHeader = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
  min-width: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;

  h2 {
    ${theme.mixins.standAloneEllipsisOneLine}
    padding: 0;
    margin: 0;
  }

  button {
    background: transparent;
    border: none;
    color: var(--darkgrey);
    transition: var(--transition);
    &:hover,
    &:focus {
      color: var(--mainColor);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  column-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  height: 224px;
`;

const ItemInfo = styled.div`
  justify-self: start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  outline: none;
`;

const CoverContainer = styled.div`
  margin-right: 16px;
  margin-left: -8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  user-select: none;
`;

const Cover = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: #282828;
  object-fit: cover;
  object-position: center center;
  user-select: none;
  border-radius: 3px;
  pointer-events: none;
`;

const Button = styled.button`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  opacity: 0;
  display: flex;
  justify-content: center;
  outline: none;
  align-items: center;
  position: absolute;
  border: none;
  border-radius: 3px;
  color: #fff;
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  padding-right: 8px;
  display: grid;
  grid-template:
    "title title"
    "badges subtitle" / auto 1fr;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  outline: none;
`;

const Title = styled.div`
  grid-area: title;
  color: var(--mainColor);
  /* justify-self: start; */
  ${theme.mixins.standAloneEllipsisOneLine}
  ${theme.mixins.title}
`;

const ArtistCss = css`
  ${theme.mixins.standAloneEllipsisOneLine}
  grid-area: subtitle;
  line-height: 16px;
  letter-spacing: normal;
  text-transform: none;
  font-size: var(--fz-sm);
`;

const ArtistExplicit = styled.span`
  ${ArtistCss}
`;

const ArtistNonExplicit = styled.span`
  ${ArtistCss}
  grid-column-start: badges;
`;

const ArtistLink = styled.a`
  color: var(--darkgrey);
  text-decoration: none;
  transition: var(--transition);

  &:hover,
  &:focus {
    color: var(--mainColor);
  }
`;

const ExplicitBadgeContainer = styled.span`
  grid-area: badges;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 24px;
`;

const ExplicitBadge = styled.span`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--liteblack);
  color: white;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: var(--fz-xxxs);
  min-width: 16px;
  height: 16px;
`;

const Controls = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-self: end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  grid-column: last;
  outline: none;
`;

const SaveToLibrary = styled.button`
  margin-right: 16px;
  background: transparent;
  border: 0;
  color: var(--mainColor);
  padding: 0;
  line-height: 0;
  outline: none;
`;

const Duration = styled.div`
  margin-right: 16px;
  font-variant: tabular-nums;
  width: 4ch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  overflow: hidden;
`;

const GridItem = styled.div`
  grid-column: 1/-1;
  grid-template-columns: [first] 4fr [last] minmax(110px, 1fr);
  display: grid;
  padding: 0 16px;
  grid-gap: 16px;
  height: 56px;
  border: 1px solid transparent;
  border-radius: 4px;
  position: relative;
  transition: var(--transition);
  user-select: none;
  outline: none;

  &:hover,
  &:focus {
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    box-shadow: var(--shadow);

    ${Button} {
      opacity: 1;
    }
  }
`;

interface TopTracksProps {
  tracks: fullTrackObject[] | null;
  query: string;
}

export const TopTracksContainer: React.FC<TopTracksProps> = ({
  tracks,
  query,
}) => {
  const router = useRouter();
  return tracks ? (
    <Section>
      <Header>
        <InnerHeader>
          <h2>Tracks</h2>
          <button onClick={() => router.push(`tracks/${query}`)}>
            See All
          </button>
        </InnerHeader>
      </Header>
      <Grid
        role="grid"
        aria-rowcount={4}
        aria-colcount={2}
        aria-label="Track search results"
      >
        {tracks.slice(0, 4).map((track, i) => {
          return (
            <GridItem
              key={i}
              role="row"
              aria-rowindex={i + 1}
              onDoubleClick={() => playTrack(track.uri)}
            >
              <ItemInfo role="gridcell" aria-colindex={1} tabIndex={-1}>
                <CoverContainer>
                  <Cover
                    src={track.album.images[1].url}
                    alt={`Cover image for ${track.name}`}
                  />
                  <Button onClick={() => playTrack(track.uri)}>
                    <svg
                      height="16px"
                      width="16px"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <polygon
                        points="21.57 12 5.98 3 5.98 21 21.57 12"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </CoverContainer>
                <InfoContainer>
                  <Title>{track.name}</Title>
                  {track.explicit ? (
                    <>
                      <ExplicitBadgeContainer>
                        <ExplicitBadge>E</ExplicitBadge>
                      </ExplicitBadgeContainer>
                      <ArtistExplicit>
                        <ArtistLink>{concatArtists(track.artists)}</ArtistLink>
                      </ArtistExplicit>
                    </>
                  ) : (
                    <ArtistNonExplicit>
                      <ArtistLink>{concatArtists(track.artists)}</ArtistLink>
                    </ArtistNonExplicit>
                  )}
                </InfoContainer>
              </ItemInfo>
              <Controls role="gridcell" aria-colindex={2} tabIndex={-1}>
                <SaveToLibrary>
                  <BsHeart />
                </SaveToLibrary>
                <Duration>
                  {millisToMinutesAndSeconds(track.duration_ms)}
                </Duration>
              </Controls>
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  ) : (
    <LoadingDiv>
      <IconLoader />
    </LoadingDiv>
  );
};
