import { cn } from "@shared/lib/styles";
import { Link } from "react-router-dom";

import s from "./text-button.module.scss";

type ExternalLinkProps = {
  as: "external-link";
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;

  disabled?: never;
  to?: never;
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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;

  to?: never;
  href?: never;
};

type CommonProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

type TextButtonProps = CommonProps &
  (ExternalLinkProps | LinkProps | ButtonProps);

export const TextButton = ({
  className,
  as,
  to,
  href,
  onClick,
  children,
  disabled = false,
  size = "medium",
}: TextButtonProps) => {
  if (as === "nav-link") {
    return (
      <Link
        to={to}
        className={cn(s.button, s[size], className)}
      >
        {children}
      </Link>
    );
  }

  if (as === "external-link") {
    return (
      <a
        href={href}
        className={cn(s.button, s[size], className)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
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
      className={cn(s.button, s[size], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
