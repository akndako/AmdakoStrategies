import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const SECTIONS = [
  { id: "investment-plan", label: "ROI & plan" },
  { id: "home-projections", label: "Projections" },
  { id: "home-partnership", label: "Referrals" },
  { id: "home-invest", label: "How to start" },
  { id: "home-cta", label: "Register" },
] as const;

const Bar = styled.nav`
  position: sticky;
  top: 101px;
  z-index: 90;

  @media (max-width: 860px) {
    top: 95px;
  }
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${theme.colors.borderLight};
  box-shadow: 0 4px 24px rgba(26, 26, 24, 0.04);
`;

const Scroll = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Pill = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) => ($active ? theme.colors.primary : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.textSecondary)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${({ $active }) => ($active ? "#fff" : theme.colors.primary)};
    background: ${({ $active }) => ($active ? theme.colors.primaryDark : theme.colors.primaryLight)};
  }
`;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingSectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Bar aria-label="On this page">
      <Scroll>
        {SECTIONS.map(({ id, label }) => (
          <Pill
            key={id}
            type="button"
            $active={active === id}
            onClick={() => {
              setActive(id);
              scrollToSection(id);
            }}
          >
            {label}
          </Pill>
        ))}
      </Scroll>
    </Bar>
  );
}
