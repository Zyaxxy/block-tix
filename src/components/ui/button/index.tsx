"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { buttonVariants } from "./variants";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const styles = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return <Comp className={styles} ref={ref} {...props} />;
    }

    return (
      <motion.button
        className={styles}
        ref={ref}
        initial={false}
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(80, 230, 180, 0.12)" }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      />
    );
  }
);

Button.displayName = "Button";
Button.displayName = "Button";

export { Button };
