import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PageTransitionProps = {
  pageKey: string;
  children: ReactNode;
};

export default function PageTransition({ pageKey, children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
