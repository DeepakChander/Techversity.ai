"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const columns = 5;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Stair columns overlay */}
        <motion.div
          className="fixed inset-0 z-[9997] pointer-events-none flex"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {Array.from({ length: columns }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-b from-blue-start to-coral"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{
                scaleY: [0, 1, 0],
                transition: {
                  duration: 0.8,
                  times: [0, 0.5, 1],
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              style={{ originY: "top" }}
            />
          ))}
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
