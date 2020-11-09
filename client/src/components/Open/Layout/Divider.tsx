import React from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  display: block;
  border-top: 1px solid var(--liteblack);
  width: 100%;
`;

export const Divider = () => {
  return <StyledDivider />;
};
