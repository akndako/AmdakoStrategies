import type { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../theme";

export const TabNav = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 6px;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  min-height: 44px;
  border: none;
  border-radius: ${theme.radii.medium};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : "transparent")};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) => ($active ? theme.colors.primaryLight : theme.colors.surfaceAlt)};
    color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  }

  .tab-badge {
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 100px;
    background: ${theme.colors.primary};
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export type TabNavItem<T extends string> = {
  id: T;
  label: string;
  icon?: ReactNode;
  badge?: number;
};

type SectionTabNavProps<T extends string> = {
  items: TabNavItem<T>[];
  active: T;
  onChange: (id: T) => void;
  ariaLabel: string;
};

export function SectionTabNav<T extends string>({
  items,
  active,
  onChange,
  ariaLabel,
}: SectionTabNavProps<T>) {
  return (
    <TabNav aria-label={ariaLabel}>
      {items.map((item) => (
        <TabButton
          key={item.id}
          type="button"
          $active={active === item.id}
          onClick={() => onChange(item.id)}
          aria-current={active === item.id ? "page" : undefined}
        >
          {item.icon}
          {item.label}
          {item.badge != null && item.badge > 0 && (
            <span className="tab-badge">{item.badge}</span>
          )}
        </TabButton>
      ))}
    </TabNav>
  );
}

export const TabIntro = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textSecondary};
  margin: 0 0 20px;
  line-height: 1.6;
`;

export const TabPanel = styled.div`
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
