import React from "react";
import OpenLayout from "../../../components/Open/Layout/OpenLayout";
import { ListeningPartyContainer } from "../../../components/Open/Sharing/ListeningParty/ListeningPartyContainer";
import { NoListeningPartyContainer } from "../../../components/Open/Sharing/ListeningParty/NoListeningPartyContainer";

interface ListeningPartyProps {}

const ListeningParty: React.FC<ListeningPartyProps> = ({}) => {
  const isPartOfParty = false;

  return (
    <>
      {isPartOfParty ? (
        <ListeningPartyContainer />
      ) : (
        <NoListeningPartyContainer />
      )}
    </>
  );
};

export default ListeningParty;
