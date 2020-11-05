import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { concatArtists } from "../../../utils/utilFunctions";
import IconLoader from "../../icons/loader";
import { SearchItemTrack } from "./Tracks/SearchItemTrack";

interface TopResultsProps {
  type: string;
  query: string | null;
}

const Container = styled.div``;

const ChildrenContainer = styled.div`
  ${theme.mixins.flexBetween};
  flex-direction: row;
`;

const Top = styled.div`
  ${theme.mixins.flexBetween};
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--darkgrey);
  transition: var(--transition);
  outline: none;
  &:hover,
  &:focus {
    color: var(--black);
  }
`;

export const TopResults: React.FC<TopResultsProps> = ({
  children,
  query,
  type,
}) => {
  const router = useRouter();
  return children ? (
    <Container>
      <Top>
        <h1>{`${type.charAt(0).toUpperCase()}${type.slice(1)}`}</h1>
        <Button onClick={() => router.push(`${type}/${query}`)}>See All</Button>
      </Top>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  ) : (
    <IconLoader />
  );
};
