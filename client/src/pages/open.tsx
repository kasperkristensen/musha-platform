import React from "react";
import { Dashboard } from "../components/Open/Dashboard";
import { AppNav } from "../components/Open/AppNav";

const Open: React.FC<{}> = ({}) => {
  return (
    <>
      <AppNav />
      <Dashboard />
    </>
  );
};

export default Open;
