import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { transferPlayback } from "../../../spotify/api_calls";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import theme from "../../../styles/theme";
import { deviceObject } from "../../../types/spotify/objectInterfaces";

interface DropdownProps {
  value: any;
  options: deviceObject[];
  placeholder: string;
  onChange: any;
  update: any;
  direction: string;
}

const StyledDropdown = styled.div.attrs((props) => ({
  direction: props.direction || "down",
}))`
  position: relative;
  margin-bottom: 30px;
  button {
    ${theme.mixins.flexCenter}
    background-color: transparent;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    color: var(--mainColor);
    font-size: var(--fz-xxs);

    p {
      margin-right: 10px;
    }
  }

  ul {
    position: absolute;
    background-color: white;
    border-radius: 4px;
    ${(props) =>
      props.direction === "up" &&
      css`
        bottom: 30px;
      `}
    ${(props) =>
      props.direction === "down" &&
      css`
        top: 30px;
      `}
    ${(props) => props.primary}
    list-style-type: none;
    padding: 10px;
    font-size: var(--fz-xxs);
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    box-shadow: var(--shadow);
    width: 130%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }

  ul li {
    color: var(--darkgrey);
    transition: var(--transition);
    cursor: pointer;
    margin: 10px 0;

    &:hover,
    &:active {
      color: var(--liteblack);
    }
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  placeholder = "Select",
  onChange,
  update,
  direction,
}) => {
  const node = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handlelickOutside = (e) => {
    const inputElement = node.current;
    if (inputElement && inputElement.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  const handleChange = (selectedValue: deviceObject) => {
    transferPlayback(selectedValue.id);
    onChange();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handlelickOutside);
    } else {
      document.removeEventListener("mousedown", handlelickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handlelickOutside);
    };
  }, [open]);
  return (
    <StyledDropdown ref={node} direction={direction}>
      <button
        onClick={() => {
          setOpen(!open);
          update();
        }}
      >
        <p>{value || placeholder}</p>
        {direction === "up" ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <ul>
          {options.map((option, i) => (
            <li key={i} onClick={() => handleChange(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </StyledDropdown>
  );
};
