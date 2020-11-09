import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { TopTracks } from "../../components/Open/Dashboard/TopTracks";
import { TrackSuggestions } from "../../components/Open/Dashboard/TrackSuggestions";

const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  @media (${theme.bp.tabletL}) {
    display: block;
    margin-top: 70px;
  } ;
`;

const Dashboard = () => {
  return (
    <>
      <TrackSuggestions />
      <Preview>
        <TopTracks />
        <TopTracks />
      </Preview>
    </>
  );
};

export default Dashboard;
