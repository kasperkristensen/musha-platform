import React from "react";
import { Dashboard } from "../components/Open/Dashboard/Dashboard";
import { AppNav } from "../components/Open/Nav/AppNav";

const Open: React.FC<{}> = ({}) => {
  return (
    <>
      <AppNav />
      <Dashboard />
    </>
  );
};

export default Open;
