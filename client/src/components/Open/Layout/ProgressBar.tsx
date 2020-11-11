import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGlobal } from "../../../contexts/playbackContext";

const Input = styled.div`
  height: 10px;
  position: absolute;
  top: -14px;
  left: -2px;
  width: 100%;

  input {
    width: 100%;
    opacity: 0;
  }

  &:hover {
    input {
      opacity: 1;
    }
  }

  input[type="range"] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type="range"]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background: var(--gradiant);
    cursor: pointer;
    box-shadow: var(--shadow);
    margin-top: -2px;
    transition: var(--transition);
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px 4px 0 0;
  }

  /* All the same stuff for Firefox */
  input[type="range"]::-moz-range-thumb {
    box-shadow: var(--shadow);
    border: none;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px 4px 0 0;
  }

  /* All the same stuff for IE */
  input[type="range"]::-ms-thumb {
    box-shadow: var(--shadow);
    border: none;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px 4px 0 0;
  }
`;

const RunningTrack = styled.div`
  background: var(--gradiant);
  height: 5px;
  position: absolute;
  border-radius: 4px 4px 0 0;
  top: 14px;
  left: 2px;
  pointer-events: none;
  transition: 1s ease;
`;

interface ProgressBarProps {
  duration_ms: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({}) => {
  const { global, setGlobal } = useGlobal();
  const [progress, setProgress] = useState<number>(0);
  const [currentPos, setCurrentPos] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>();

  const duration_ms = 100;

  useEffect(() => {
    const tick = () => {
      currentPos < 100 && global?.playback?.is_playing
        ? setCurrentPos(currentPos + 1)
        : null;
    };
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    setProgress((currentPos / duration_ms) * 100);
  }, [currentPos]);
  let borderRadius = "4px 0 0 0";
  progress === 100 ? (borderRadius = "4px 4px 0 0") : null;
  return (
    <Input>
      <RunningTrack
        style={{ width: `${progress}%`, borderRadius: `${borderRadius}` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => {
          setCurrentPos(parseInt(e.target.value));
          console.log(e.target.value);
        }}
      ></input>
    </Input>
  );
};
