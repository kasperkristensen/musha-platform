import React, { useEffect, useState } from "react";

interface GeneratedSuggestionsProps {
  seeds: any[];
}

function shuffle(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

const shuffeSeeds = () => {
  var a: number[] = [];
  for (let i = 0; i < 40; ++i) a[i] = i;

  return a;
};

const spliceAndDice = (arr: number[]) => {
  return arr.splice(0, 10);
};

export const GeneratedSuggestions: React.FC<GeneratedSuggestionsProps> = ({}) => {
  const [state, setState] = useState({
    seeds: null,
    loadedTracks: null,
  });

  const [end, setEnd] = useState(false);

  return (
    <div>
      <p>nada</p>
    </div>
  );
};
