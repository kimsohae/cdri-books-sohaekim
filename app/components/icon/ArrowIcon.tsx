import { type SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export default function ArrowIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("text-[#B1B8C0]", className)}
      {...props}
    >
      <path
        d="M2 -5.24537e-07L7 5L12 -8.74228e-08L14 1L7 8L-4.37114e-08 0.999999L2 -5.24537e-07Z"
        fill="currentColor"
      />
    </svg>
  );
}
