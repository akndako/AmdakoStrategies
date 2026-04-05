import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: radial-gradient(circle at top, #0b0b1a, #020204);
    color: #fff;
  }

  h1, h2, h3 {
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  button {
    cursor: pointer;
  }
`;

