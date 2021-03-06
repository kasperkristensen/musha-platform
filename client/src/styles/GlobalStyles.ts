import { createGlobalStyle } from "styled-components";
import TransitionStyles from "./TransitionStyles";

const GlobalStyles = createGlobalStyle`
 
 :root {
  /* --mainColor: rgb(71,79,97); */
  --liteblack: rgb(45, 46, 50);
  --darkblack: rgb(37, 38, 42);
  --mainColor: white;
  --grey: rgb(239, 239, 239);
  --darkgrey: rgb(161, 161, 172);
  --blue: rgb(88, 118, 246);
  --gradiant: linear-gradient(
    360deg,
    rgba(255, 0, 42, 1) 0%,
    rgba(255, 0, 233, 1) 100%
  );

  --gutter: 50px;

  --fz-xxxs: 10px;
  --fz-xxs: 12px;
  --fz-xs: 13px;
  --fz-sm: 14px;
  --fz-md: 16px;
  --fz-lg: 18px;
  --fz-xl: 20px;
  --fz-xxl: 22px;
  --fz-heading: 32px;
  --fz-xl-heading: 72px;

  --border-radius: 5px;

  --nav-height: 100px;
  --nav-scroll-height: 70px;

  --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
  --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  --shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);

  }

  .big-heading {
    margin: 0;
    font-size: clamp(45px, 8vw, 70px);
  }
  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 50px);
  }

  html {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow: auto;
    overflow: initial;
    overscroll-behavior: none;
  }

 body {
  min-height: 100%;
  /* overflow-x: hidden; */
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mainColor);
  font-family: 'Poppins', sans-serif;
  height: 100%;
  overflow: auto;
 }

 a {
   text-decoration: none;
 }

 button {
   font-family: 'Poppins', sans-serif;
 }

 main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 0 100px;
    @media (max-width: 1080px) {
      padding: 0 100px;
    }
    @media (max-width: 768px) {
      padding: 0 50px;
    }
    @media (max-width: 480px) {
      padding: 0 25px;
    }
    &.fillHeight {
      padding: 0 150px;
      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

 ${TransitionStyles}
`;

export default GlobalStyles;
