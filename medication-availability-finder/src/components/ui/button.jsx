import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    outline:
      "border border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    ghost:
      "text-foreground hover:bg-muted focus:ring-primary",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
