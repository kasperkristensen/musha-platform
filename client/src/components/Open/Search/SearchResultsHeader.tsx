import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";

interface SearchResultsHeaderProps {}

const HeaderContainer = styled.div`
  justify-self: start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const TopRow = styled.div`
  display: grid;
  padding: 0 16px;
  grid-gap: 16px;
  grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(
      110px,
      1fr
    );

  ${HeaderContainer}:last-child {
    justify-self: end;
  }
`;

const Pound = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-self: end;
`;

const TextContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  border: none;
`;

const HeaderText = styled.span`
  ${theme.mixins.standAloneEllipsisOneLine}
  font-size: var(--fz-sm);
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({}) => {
  return (
    <TopRow>
      <Pound>#</Pound>
      <HeaderContainer>
        <TextContainer>
          <HeaderText>Title</HeaderText>
        </TextContainer>
      </HeaderContainer>
      <HeaderContainer>
        <TextContainer>
          <HeaderText>Album</HeaderText>
        </TextContainer>
      </HeaderContainer>
      <HeaderContainer>
        <TextContainer>
          <HeaderText>Duration</HeaderText>
        </TextContainer>
      </HeaderContainer>
    </TopRow>
  );
};
