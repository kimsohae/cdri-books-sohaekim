import { type SVGProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends SVGProps<SVGSVGElement> {
  type?: "fill" | "stroke";
}

/**
 * type이 fill인 경우 채워진 하트, stroke인 경우 빈 하트
 * - fill 타입 하트 색상은 app.css 에서 --color-red로 변경 가능
 * - stroke 타입 하트 색상은 className에서 text 컬러로 변경 가능
 * @param className
 * @param type
 * @returns
 */
export default function LikeIcon({
  className,
  type = "stroke",
  ...props
}: Props) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
      className={`${twMerge("text-white", className)}`}
      {...props}
    >
      {type === "stroke" && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 6.5C0 2.91017 2.91015 0 6.5 0C8.24701 0 9.83288 0.689818 11 1.80968C12.1671 0.689818 13.753 0 15.5 0C19.0898 0 22 2.91017 22 6.5C22 9.63412 20.164 12.4994 18.0231 14.6615C15.8724 16.8335 13.2421 18.4718 11.3154 19.1121C11.1106 19.1801 10.8894 19.1801 10.6846 19.1121C8.75788 18.4718 6.12761 16.8335 3.97692 14.6615C1.83596 12.4994 0 9.63412 0 6.5ZM6.5 2C4.01472 2 2 4.01473 2 6.5C2 8.86588 3.41404 11.2506 5.39808 13.2543C7.24453 15.119 9.43684 16.5021 11 17.1011C12.5632 16.5021 14.7555 15.119 16.6019 13.2543C18.586 11.2506 20 8.86588 20 6.5C20 4.01473 17.9853 2 15.5 2C13.9789 2 12.6337 2.75379 11.8176 3.91266C11.6303 4.17865 11.3253 4.3369 11 4.3369C10.6747 4.3369 10.3697 4.17865 10.1824 3.91266C9.36631 2.75379 8.02112 2 6.5 2Z"
          fill="currentColor"
        />
      )}
      {type === "fill" && (
        <path
          d="M6.5 1C3.46244 1 1 3.46245 1 6.5C1 12 7.5 17 11 18.1631C14.5 17 21 12 21 6.5C21 3.46245 18.5375 1 15.5 1C13.6398 1 11.9953 1.92345 11 3.3369C10.0047 1.92345 8.36015 1 6.5 1Z"
          fill="var(--color-red)"
          stroke="var(--color-red)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
