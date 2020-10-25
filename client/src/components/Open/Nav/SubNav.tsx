import React from "react";
import styled from "styled-components";

interface SubNavProps {
  title: string;
}

const Container = styled.div`
  h3 {
    color: var(--darkgrey);
    font-weight: 600;
    font-size: var(--fz-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.5rem 0;
  }
`;

const SubNavUl = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0 0 1.5rem 0;
  list-style-type: none;
  width: 100%;
`;

export const SubNav: React.FC<SubNavProps> = ({ children, ...props }) => {
  return children ? (
    <Container>
      <h3>{props.title}</h3>
      <SubNavUl>
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </SubNavUl>
    </Container>
  ) : null;
};
