import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button/variants";

type AnimatedButtonProps = Omit<ButtonProps, keyof HTMLMotionProps<"button">> & 
  HTMLMotionProps<"button">;

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const motionProps: HTMLMotionProps<"button"> = {
      whileHover: { scale: 1.04, boxShadow: "0 8px 32px rgba(80, 230, 180, 0.12)" },
      whileTap: { scale: 0.98 },
      ...props
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...motionProps}
      />
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
export type { AnimatedButtonProps };
