import { css } from "styled-components";

const button = css`
  color: white;
  background-color: var(--black);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--liteblack);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  button,

  smallButton: css`
    color: var(--black);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.5rem 1rem;
    font-size: var(--fz-xs);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    box-shadow: var(--shadow);
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      /* transform: scale(1.01); */
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: white;
    background-color: var(--black);
    border-radius: var(--border-radius);
    padding: 1rem 1.75rem;
    font-size: var(--fz-sm);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--liteblack);
    }
    &:after {
      display: none !important;
    }
  `,
};

export default mixins;
