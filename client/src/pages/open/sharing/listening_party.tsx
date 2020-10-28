import React from "react";
import OpenLayout from "../../../components/Open/Layout/OpenLayout";
import { ListeningPartyContainer } from "../../../components/Open/Sharing/ListeningParty/ListeningPartyContainer";

interface ListeningPartyProps {}

const ListeningParty: React.FC<ListeningPartyProps> = ({}) => {
  const isPartOfParty = true;

  return (
    <OpenLayout>
      {isPartOfParty ? <ListeningPartyContainer /> : <p>No active party</p>}
    </OpenLayout>
  );
};

export default ListeningParty;
