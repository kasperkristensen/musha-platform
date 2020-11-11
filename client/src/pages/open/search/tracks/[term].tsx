import React, { useCallback, useEffect, useRef, useState } from "react";
import IconLoader from "../../../../components/icons/loader";
import { Divider } from "../../../../components/Open/Layout/Divider";
import { SearchResultsHeader } from "../../../../components/Open/Search/SearchResultsHeader";
import { SearchListItem } from "../../../../components/Open/Search/Tracks/SearchListItem";
import { useGetAllSearchResults } from "../../../../spotify/api_calls";
import { fullTrackObject } from "../../../../types/spotify/objectInterfaces";

interface SearchTracksProps {}

const SearchTracks: React.FC<SearchTracksProps> = ({}) => {
  const [query, setQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  const {
    loading,
    error,
    errorMessage,
    searchResults,
    hasMore,
  } = useGetAllSearchResults(query, "tracks", offset);

  useEffect(() => {
    let regex = /q=.*[^/]/g;
    let term = window.location.pathname.match(regex);
    term ? setQuery(term[0]) : null;
  }, []);

  const observer = useRef<any>();
  const lastTrackElement = useCallback(
    (node) => {
      if (loading) return;
      observer.current ? observer.current.disconnect() : null;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });
      node ? observer.current.observe(node) : null;
    },
    [loading, hasMore]
  );
  return (
    <div>
      <h1>Showing tracks for {query}</h1>
      <SearchResultsHeader />
      {searchResults
        ? (searchResults as fullTrackObject[]).map((track, i) => {
            if (searchResults.length === i + 1) {
              return (
                <div key={i} ref={lastTrackElement}>
                  <SearchListItem track={track} index={i} />
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <SearchListItem track={track} index={i} />
                  <Divider />
                </div>
              );
            }
          })
        : null}
      {loading ? <IconLoader /> : null}
    </div>
  );
};

export default SearchTracks;
