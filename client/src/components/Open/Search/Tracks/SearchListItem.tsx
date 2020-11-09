import React from "react";
import { BsHeart } from "react-icons/bs";
import styled, { css } from "styled-components";
import { playTrack } from "../../../../spotify/api_calls";
import theme from "../../../../styles/theme";
import { fullTrackObject } from "../../../../types/spotify/objectInterfaces";
import {
  concatArtists,
  millisToMinutesAndSeconds,
} from "../../../../utils/utilFunctions";

interface SearchListItemProps {
  track: fullTrackObject;
  index: number;
}

const Grid = styled.div`
  display: grid;
  padding: 0 16px;
  grid-gap: 16px;
  grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(
      110px,
      1fr
    );
  height: 56px;
  border: 1px solid transparent;
  border-radius: 4px;
  position: relative;
`;

const Num = styled.span`
  position: absolute;
  top: -4px;
  right: 0.25em;
  font-variant: tabular-nums;
  opacity: 1;
`;

const PlayButton = styled.button`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  background: transparent;
  border: 0;
  color: var(--mainColor);
  width: 100%;
  height: 100%;
  padding: 0;
`;

const PlayIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

const Index = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  justify-self: end;
`;

const IndexContainer = styled.div`
  color: var(--darkgrey);
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  display: inline-block;
  position: relative;
`;

const Info = styled.div`
  justify-self: start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const Cover = styled.img`
  margin-right: 16px;
  flex-shrink: 0;
  background-color: var(--mainColor);
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 2px;
`;

const TrackInfo = styled.div`
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
  padding-right: 16px;
  overflow: hidden;
  justify-self: start;
`;

const Title = styled.div`
  ${theme.mixins.standAloneEllipsisOneLine}
  grid-area: title;
  color: var(--mainColor);
  display: -webkit-box;
  line-height: 24px;
  letter-spacing: normal;
  text-transform: none;
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
  background-color: var(--mainColor);
  color: white;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: var(--fz-xxxs);
  min-width: 16px;
  height: 16px;
`;

const Album = styled.div`
  ${theme.mixins.standAloneEllipsisOneLine}
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
`;

const AlbumLink = styled.a`
  ${theme.mixins.standAloneEllipsisOneLine}
  color: var(--darkgrey);
  font-size: var(--fz-sm);
  text-decoration: none;
  transition: var(--transition);

  &:hover,
  &:focus {
    color: var(--mainColor);
  }
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
`;

const SaveToLibrary = styled.button`
  margin-right: 16px;
  background: transparent;
  border: 0;
  color: var(--mainColor);
  padding: 0;
  opacity: 0;
  line-height: 0;
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

const Container = styled.div`
  display: block;
  box-sizing: border-box;
  user-select: none;
  margin: 0;
  padding: 0;
  border: 0;

  &:hover,
  &:focus {
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    box-shadow: var(--shadow);
    ${PlayButton} {
      opacity: 1;
    }
    ${Num} {
      opacity: 0;
    }
    ${SaveToLibrary} {
      opacity: 1;
    }
  }
`;

export const SearchListItem: React.FC<SearchListItemProps> = ({
  track,
  index,
}) => {
  // TODO:: implement function to seperate artists into individual links
  // function concatArtistsElements(artists: simplifiedArtistObject[]) {
  //   if (artists.length === 1) {
  //     return [<ArtistLink>{artists[0].name}</ArtistLink>];
  //   }

  //   let i: number;
  //   let elements = [<ArtistLink href="#">{artists[0].name}</ArtistLink>];

  //   for (i = 1; i < artists.length; i++) {
  //     elements = elements.concat(<p>, </p>);
  //     elements = elements.concat(
  //       <ArtistLink href="#">{artists[0].name}</ArtistLink>
  //     );
  //   }

  //   return elements;
  // }

  return (
    <Container onDoubleClick={() => playTrack(track.uri)} role="row">
      <Grid>
        <Index role="gridcell" aria-colindex={1} tabIndex={-1}>
          <IndexContainer>
            <Num>{index + 1}</Num>
            <PlayButton onClick={() => playTrack(track.uri)}>
              <PlayIcon height="32" role="img" width="32" viewBox="0 0 24 24">
                <polygon
                  points="21.57 12 5.98 3 5.98 21 21.57 12"
                  fill="currentColor"
                />
              </PlayIcon>
            </PlayButton>
          </IndexContainer>
        </Index>
        <Info role="gridcell" aria-colindex={2} tabIndex={-1}>
          <Cover
            aria-hidden="false"
            loading="eager"
            src={track.album.images[2].url}
            alt={`Cover for ${track.name}`}
          ></Cover>
          <TrackInfo>
            <Title>{track.name}</Title>
            {track.explicit ? (
              <>
                <ExplicitBadgeContainer>
                  <ExplicitBadge>E</ExplicitBadge>
                </ExplicitBadgeContainer>
                <ArtistExplicit>
                  <ArtistLink href="#">
                    {concatArtists(track.artists)}
                  </ArtistLink>
                </ArtistExplicit>
              </>
            ) : (
              <ArtistNonExplicit>
                <ArtistLink href="#">{concatArtists(track.artists)}</ArtistLink>
              </ArtistNonExplicit>
            )}
          </TrackInfo>
        </Info>
        <Album role="gridcell" aria-colindex={3} tabIndex={-1}>
          <AlbumLink>{track.album.name}</AlbumLink>
        </Album>
        <Controls role="gridcell" aria-colindex={4} tabIndex={-1}>
          <SaveToLibrary>
            <BsHeart />
          </SaveToLibrary>
          <Duration>{millisToMinutesAndSeconds(track.duration_ms)}</Duration>
        </Controls>
      </Grid>
    </Container>
  );
};
