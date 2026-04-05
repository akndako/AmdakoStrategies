import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";

import Navbar from "../src/components/NavBar";
import Hero from "./components/Hero";
import Features from "../src/components/Features";
import Opportunities from "../src/components/Opportunities";
import Stats from "../src/components/Stats";
import Footer from "../src/components/Footer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Features />
      <Opportunities />
      <Stats />
      <Footer />
    </ThemeProvider>
  );
}