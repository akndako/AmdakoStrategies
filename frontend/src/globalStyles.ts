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
    font-family: 'Inter', system-ui, sans-serif;
    background: radial-gradient(circle at top, rgba(124, 108, 246, 0.15), transparent 28%),
      radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.08), transparent 25%),
      #05050f;
    color: #f8f8ff;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  h1 {
    font-size: 3.25rem;
    line-height: 1.08;

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
    line-height: 1.18;

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
    font-size: 1.85rem;
    line-height: 1.25;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.35rem;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(248, 248, 255, 0.85);

    @media (max-width: 768px) {
      font-size: 0.97rem;
    }

    @media (max-width: 480px) {
      font-size: 0.92rem;
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  .container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 768px) {
      padding: 0 16px;
    }
  }
`;

