import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    background: radial-gradient(circle at top, rgba(124, 108, 246, 0.16), transparent 35%),
      radial-gradient(circle at 20% 5%, rgba(0, 212, 255, 0.08), transparent 28%),
      linear-gradient(180deg, #05070f 0%, #030409 100%);
    color: #eef2ff;
    line-height: 1.6;
    letter-spacing: 0.02em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: rgba(124, 108, 246, 0.32);
    color: #ffffff;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  button {
    cursor: pointer;
  }

  #root {
    min-height: 100vh;
  }
`;

