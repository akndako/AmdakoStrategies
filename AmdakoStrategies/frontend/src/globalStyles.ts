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
    background: #F8F6F1;
    color: #1A1A18;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #1A1A18;
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
    line-height: 1.15;

    @media (max-width: 1024px) {
      font-size: 2.1rem;
    }

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }

    @media (max-width: 480px) {
      font-size: 1.7rem;
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
    line-height: 1.75;
    color: #5C5A52;

    @media (max-width: 768px) {
      font-size: 0.97rem;
    }

    @media (max-width: 480px) {
      font-size: 0.92rem;
    }
  }

  a {
    color: #0271c4;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #015a9e;
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

  ::selection {
    background: #C9A227;
    color: #FFFFFF;
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