import type { IconProps } from "@shared/types";

type ChevronDownProps = Pick<IconProps, "className" | "size" | "onClick">;

export const ChevronDown = ({
  className,
  size = 24,
  onClick,
}: ChevronDownProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      width={size}
      height={size}
      onClick={onClick}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
