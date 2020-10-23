import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";

interface DiscoverGenresProps {
  genres: string[];
}

const StyledContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  display: grid;
  width: 20%;
  grid-template-rows: repeat(2, minmax(150px, min-content));
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-columns: repeat(auto-fit, 100px);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 150px;
`;

const Genre = styled.div`
  ${theme.mixins.flexCenter}
  background-color: var(--blue);
  color: white;
  font-weight: 600;
  margin: 10px;
  border-radius: 5px;

  p {
    text-transform: capitalize;
  }
`;

export const DiscoverGenres: React.FC<DiscoverGenresProps> = (props) => {
  return (
    <StyledContainer>
      {props.genres.map((genre, i) => (
        <Genre key={i}>
          <p>{genre}</p>
        </Genre>
      ))}
    </StyledContainer>
  );
};
