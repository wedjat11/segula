import React from "react";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const TransitionWrapper: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
