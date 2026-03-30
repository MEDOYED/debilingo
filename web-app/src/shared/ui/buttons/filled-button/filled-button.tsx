import { cn } from "@shared/lib/styles";
import { Link } from "react-router-dom";

import s from "./filled-button.module.scss";

type ExternalLinkProps = {
  as: "external-link";
  href: string;

  disabled?: never;
  to?: never;
  onClick?: never;
};

type LinkProps = {
  as: "nav-link";
  to: string;

  disabled?: never;
  href?: never;
  onClick?: never;
};

type ButtonProps = {
  as: "button";
  onClick: () => void;
  disabled?: boolean;

  to?: never;
  href?: never;
};

type CommonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "error";
  size?: "small" | "medium" | "large";
  className?: string;
};

type FilledButtonProps = CommonProps &
  (ExternalLinkProps | LinkProps | ButtonProps);

export const FilledButton = ({
  className,
  as,
  to,
  href,
  onClick,
  children,
  disabled = false,
  variant = "primary",
  size = "medium",
}: FilledButtonProps) => {
  if (as === "nav-link") {
    return (
      <Link
        to={to}
        className={cn(s.button, s[variant], s[size], className)}
      >
        {children}
      </Link>
    );
  }

  if (as === "external-link") {
    return (
      <a
        href={href}
        className={cn(s.button, s[variant], s[size], className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // as === button
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(s.button, s[variant], s[size], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
