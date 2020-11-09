import { css } from "styled-components";

const button = css`
  color: white;
  background-color: var(--mainColor);
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
    color: var(--mainColor);
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
    background-color: var(--mainColor);
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

  standAloneEllipsisOneLine: css`
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: unset;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,

  title: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: normal;
    text-transform: none;
  `,

  bigHeading: css`
    margin: 0;
    font-size: clamp(45px, 8vw, 70px);
  `,
  mediumHeading: css`
    margin: 0;
    font-size: clamp(40px, 8vw, 50px);
  `,
};

export default mixins;
