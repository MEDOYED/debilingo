import type { IconProps } from "@shared/types";

type CopyPasteIconProps = {
  size?: IconProps["size"];
  color?: IconProps["color"];
};

export const CopyPasteIcon = ({
  size = 24,
  color = "currentColor",
}: CopyPasteIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M9 15h6a2 2 0 0 0 2-2V7" />
      <path d="M17 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />

      <path d="M12 21h7a2 2 0 0 0 2-2v-7l-4-4h-5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z" />
      <path d="M17 8v4h4" />
    </svg>
  );
};
