import { useState, type ReactNode } from "react";
import { SectionTabNav } from "./SectionTabNav";
import { Compass, Layers, LineChart, ListOrdered } from "lucide-react";

type HomeSection = "top" | "features" | "plans" | "how-to";

const HOME_SECTIONS: { id: HomeSection; label: string; icon: ReactNode; hash: string }[] = [
  { id: "top", label: "Overview", icon: <Compass size={16} aria-hidden />, hash: "home-top" },
  { id: "features", label: "Why us", icon: <Layers size={16} aria-hidden />, hash: "home-features" },
  { id: "plans", label: "Plans", icon: <LineChart size={16} aria-hidden />, hash: "home-plans" },
  { id: "how-to", label: "How to invest", icon: <ListOrdered size={16} aria-hidden />, hash: "home-invest" },
];

function scrollToSection(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function HomeSectionNav() {
  const [active, setActive] = useState<HomeSection>("top");

  return (
    <SectionTabNav
      ariaLabel="Home page sections"
      items={HOME_SECTIONS.map(({ id, label, icon }) => ({ id, label, icon }))}
      active={active}
      onChange={(id) => {
        setActive(id);
        const section = HOME_SECTIONS.find((s) => s.id === id);
        if (section) scrollToSection(section.hash);
      }}
    />
  );
}
