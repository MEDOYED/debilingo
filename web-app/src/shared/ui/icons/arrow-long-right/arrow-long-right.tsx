export interface ArrowLongRightProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const ArrowLongRight = ({
  className = "",
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
}: ArrowLongRightProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      width={size}
      height={size}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
