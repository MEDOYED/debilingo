import type { IconProps } from "@shared/types";

type Props = Pick<IconProps, "className" | "size" | "onClick">;

export const CloseCircleOutline = ({
  className,
  size = 24,
  onClick,
}: Props) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      onClick={onClick}
    >
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32px"
      />
      <path
        d="M320 320 192 192M192 320l128-128"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
    </svg>
  );
};
