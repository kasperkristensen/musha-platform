import React, { useEffect, useState } from "react";
import OpenLayout from "../../../components/Open/Layout/OpenLayout";
import { TopResults } from "../../../components/Open/Search/TopResults";
import { dummySearch } from "../../../spotify/api_calls";

interface searchProps {}

const Search: React.FC<searchProps> = ({}) => {
  const [state, setState] = useState<any | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    };
  }, []);

  var pathName: string | null;
  loaded ? (pathName = window.location.pathname) : (pathName = null);

  useEffect(() => {
    const fetchData = async () => {
      let regex = /q=.*[^/]/g;
      let term = window.location.pathname.match(regex);
      if (term !== null) {
        const data = await dummySearch(term[0]);
        setState(data.data.artists.items);
      } else {
        setState(null);
      }
    };
    fetchData();
  }, [pathName]);

  return <TopResults artists={state}></TopResults>;
};

export default Search;
