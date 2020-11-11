import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import {
  useGetAlbum,
  useGetArtist,
  useGetTrack,
} from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import {
  fullArtistObject,
  simplifiedArtistObject,
} from "../../../types/spotify/objectInterfaces";
import { concatArtists } from "../../../utils/utilFunctions";
import IconLoader from "../../icons/loader";

interface TopResultProps {
  type: string;
  id: string | null;
  img: string | null;
  title: string | null;
  artist: fullArtistObject | simplifiedArtistObject | null;
  explicit?: boolean;
}

const Header = styled.div`
  grid-column: 1/-1;
  display: block;
`;

const InnerHeader = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
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
`;

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  overflow-y: hidden;
  grid-auto-rows: 0;
  grid-template-rows: 1fr;
`;

const Container = styled.div`
  grid-column: span 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

const Card = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  padding: 20px;
  background: var(--liteblack);
  border-radius: 4px;
  isolation: isolate;
  width: 100%;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
`;

const InnerCard = styled.div`
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 20px;
`;

const CoverContainer = styled.div`
  width: 100px;
  padding-bottom: 92px;
  position: relative;
  border-radius: 3px;
  background-color: #333;
  -webkit-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
`;

const Cover = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  display: block;
  object-fit: cover;
  object-position: center center;
`;

const Info = styled.div`
  min-height: 62px;
`;

const TitleLink = styled.a`
  position: relative;
  z-index: 1;
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
  color: var(--mainColor);
  ${theme.mixins.standAloneEllipsisOneLine}
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.04em;
  text-transform: none;
  ${theme.mixins.standAloneEllipsisOneLine}
`;

const SmallInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 4px;
  white-space: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 16px;
`;

const ArtistLink = styled.a`
  position: relative;
  z-index: 1;
  text-decoration: none;
  color: var(--darkgrey);
`;

const Badge = styled.span`
  margin-left: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  padding: 4px 12px;
  border-radius: 500px;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const PlayButtonContainer = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 10px;
  -webkit-transform: translateY(8px);
  transform: translateY(8px);
  opacity: 0;
  -webkit-transition: var(--transition);
  transition: var(--transition);
  -webkit-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  z-index: 2;
  border-radius: 500px;
  right: 20px;

  &:hover,
  &:focus {
    bottom: 40px;
  }
`;
const PlayButton = styled.button`
  --size: 48px;
  color: #fff;
  background-color: var(--darkblack);
  position: relative;
  z-index: 1;
  --size: 40px;
  font-size: 8px;
  border: 0;
  border-radius: 500px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: var(--size);
  width: var(--size);
  min-width: var(--size);
`;

const SVG = styled.svg`
  height: 24px;
  width: 24px;
  overflow: hidden;
`;

const Section = styled.section`
  grid-column: 1/3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  &:hover,
  &:focus {
    ${Card} {
      -webkit-box-shadow: var(--shadow);
      -moz-box-shadow: var(--shadow);
      box-shadow: var(--shadow);
    }
    ${PlayButtonContainer} {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
`;

export const TopResult: React.FC<TopResultProps> = ({
  type,
  id,
  img,
  title,
  artist,
  explicit,
}) => {
  const router = useRouter();
  return (
    <Section onClick={() => router.push(`/open/${type}/${id}`)}>
      <Header>
        <InnerHeader>
          <h2>Top result</h2>
        </InnerHeader>
      </Header>
      <Grid>
        <Container>
          <Card>
            <InnerCard>
              <CoverContainer>
                {img ? <Cover src={img} /> : null}
              </CoverContainer>
              <Info>
                <Title>
                  <TitleLink href="#">{title ? title : ""}</TitleLink>
                </Title>
                <SmallInfo>
                  {type === "album" || type === "track" ? (
                    <ArtistLink
                      onClick={() =>
                        router.push(`/open/artist/${artist ? artist.id : "#"}`)
                      }
                    >
                      {artist ? artist.name : ""}
                    </ArtistLink>
                  ) : null}
                  <Badge>{type.toUpperCase()}</Badge>
                </SmallInfo>
                <PlayButtonContainer>
                  <PlayButton>
                    <SVG
                      height="24px"
                      width="24px"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <polygon
                        points="21.57 12 5.98 3 5.98 21 21.57 12"
                        fill="currentColor"
                      />
                    </SVG>
                  </PlayButton>
                </PlayButtonContainer>
              </Info>
            </InnerCard>
          </Card>
        </Container>
      </Grid>
    </Section>
  );
};
