import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    min-height: 100%;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #ffffff;
    color: #0A2540;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0A2540;
  }

  h1 {
    font-size: 3.25rem;
    line-height: 1.1;

    @media (max-width: 1200px) {
      font-size: 2.9rem;
    }

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }

    @media (max-width: 768px) {
      font-size: 2.1rem;
    }

    @media (max-width: 480px) {
      font-size: 1.85rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1.2;

    @media (max-width: 1024px) {
      font-size: 2.1rem;
    }

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }

    @media (max-width: 480px) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.35rem;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
    color: #425466;

    @media (max-width: 768px) {
      font-size: 0.97rem;
    }

    @media (max-width: 480px) {
      font-size: 0.92rem;
    }
  }

  a {
    color: #635BFF;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #4C45E8;
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  .container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 24px;

    @media (max-width: 768px) {
      padding: 0 20px;
    }

    @media (max-width: 480px) {
      padding: 0 16px;
    }
  }
`;