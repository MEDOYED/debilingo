import type { IconProps } from "@shared/types";

type ArrowsRightLeftProps = Pick<IconProps, "className" | "size" | "onClick">;

export const ArrowsRightLeft = ({
  className,
  size = 24,
  onClick,
}: ArrowsRightLeftProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
};
