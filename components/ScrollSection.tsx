"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  triggerOnce?: boolean;
  staggerChildren?: number;
  delay?: number;
}

export function ScrollSection({
  children,
  className = "",
  triggerOnce = true,
  staggerChildren = 0.08,
  delay = 0,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [12, 0, 0, 12]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(60px) scale(0.92)",
        filter: "blur(12px)",
      }}
      animate={{
        opacity,
        y,
        scale,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 30,
        delay,
      }}
      initial={false}
    >
      {typeof children === "function" ? children({ opacity, y, scale, blur }) : children}
    </motion.div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getTransforms = () => {
    switch (direction) {
      case "up":
        return { y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [distance, 0, 0, -distance]) };
      case "down":
        return { y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-distance, 0, 0, distance]) };
      case "left":
        return { x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [distance, 0, 0, -distance]) };
      case "right":
        return { x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-distance, 0, 0, distance]) };
    }
  };

  const transforms = getTransforms();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [8, 0, 0, 8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity: 0, ...(direction === "up" || direction === "down" ? { y: distance } : { x: distance }), filter: "blur(8px)" }}
      animate={{
        opacity,
        ...transforms,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 35,
        delay,
      }}
      initial={false}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.06,
  delayChildren = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              variants: {
                hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 30,
                  },
                },
              },
            })
          : child
      )}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerItem({
  children,
  className = "",
  delay = 0,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 30,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

export function useElementScrollProgress(ref: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}