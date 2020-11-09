import React from "react";
import styled, { css } from "styled-components";
import { useGetTopArtists } from "../../../../spotify/api_calls";
import theme from "../../../../styles/theme";

interface NoListeningPartyContainerProps {}

const GraphicContainer = styled.div`
  width: 100%;
  ${theme.mixins.flexCenter}
`;

const Graphic = styled.div`
  width: 550px;
  height: 550px;
  border-radius: 100%;
  position: relative;
  background: rgb(255, 0, 42);
  background: linear-gradient(
    360deg,
    rgba(255, 0, 42, 1) 0%,
    rgba(255, 0, 233, 1) 100%
  );
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
`;

const ArtistCss = css`
  border-radius: 100%;
  position: absolute;
  overflow: hidden;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
`;

const BigArtist = styled.div`
  ${ArtistCss}
  height: 200px;
  width: 200px;
  bottom: -10px;
  right: 10px;
`;
const MediumArtist = styled.div`
  ${ArtistCss}
  height: 140px;
  width: 140px;
  top: 90px;
  right: -40px;
`;
const SmallArtist = styled.div`
  ${ArtistCss}
  height: 100px;
  width: 100px;
  top: 40px;
  left: 20px;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const InputContainer = styled.div`
  ${theme.mixins.flexBetween}
  background: white;
  height: 56px;
  width: 80%;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  align-items: center;
  padding: 0 20px;
  border-radius: 4px;
  margin: 2rem 0 1rem 0;

  button {
    border: none;
    background: transparent;
    color: var(--darkgrey);
    transition: var(--transition);
    font-weight: 600;
    &:focus,
    &:hover {
      color: var(--liteblack);
    }
  }
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    color: var(--liteblack);
  }
  input {
    border: none;
    transition: var(--transition);
    outline: none;
    font-family: "Poppins", sans-serif;
  }
`;

const JoinContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 2rem;

  h2 {
    ${theme.mixins.mediumHeading}
  }

  a {
    color: var(--mainColor);
    transition: var(--transition);

    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }

  p {
    color: var(--darkgrey);
  }

  @media (min-width: 764px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
`;

export const NoListeningPartyContainer: React.FC<NoListeningPartyContainerProps> = ({}) => {
  const { artists, loading } = useGetTopArtists(1);
  return artists && !loading ? (
    <Container>
      <JoinContainer>
        <h2>Hey it's seems a little quiet over here</h2>
        <p>
          If you have an event code, you can use it to join a listening party by
          entering it below.
        </p>
        <InputContainer>
          <InputDiv>
            <span>#</span>
            <input placeholder="Enter event code"></input>
          </InputDiv>
          <button>Join</button>
        </InputContainer>
        <p>
          or start your own <a href="#">listening party</a>
        </p>
      </JoinContainer>
      <GraphicContainer>
        <Graphic>
          <BigArtist>
            <Cover src={artists[3].images[0].url} />
          </BigArtist>
          <MediumArtist>
            <Cover src={artists[2].images[0].url} />
          </MediumArtist>
          <SmallArtist>
            <Cover src={artists[1].images[0].url} />
          </SmallArtist>
        </Graphic>
      </GraphicContainer>
    </Container>
  ) : null;
};
