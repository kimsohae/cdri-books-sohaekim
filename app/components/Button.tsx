import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// 공통 스타일을 위한 className
const DEFAULT_STYLE_CN =
  "w-full h-12 flex items-center justify-center rounded-default";

// props에 따른 스타일을 위한 className
const VARIANT_STYLE_CN = {
  color: {
    primary: "bg-primary text-white",
    lightGray: "bg-lightGray text-txt-subtitle",
  },
  variant: {
    solid: "",
    outline: "bg-white border ",
  },
  size: {
    sm: "body2 p-[10px] h-[36px] border-txt-subtitle",
    md: "caption",
  },
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "lightGray";
  variant?: "solid" | "outline";
  size?: "md" | "sm";
}

/**
 * Button 컴포넌트
 *
 * color, variant, size를 prop으로 받아 VARIANT_STYLE_CN을 적용한다.
 * 개별 스타일링이 필요한 경우 className 활용
 *
 * 기본값
 * - color = 'primary'
 * - variant = 'solid'
 * - size = 'md'
 */
export default function Button({
  color = "primary",
  variant = "solid",
  size = "md",
  className,
  ...props
}: Props) {
  const mergedClassName = twMerge(
    DEFAULT_STYLE_CN,
    VARIANT_STYLE_CN.color[color],
    VARIANT_STYLE_CN.size[size],
    VARIANT_STYLE_CN.variant[variant],
    className
  );
  return <button className={mergedClassName} {...props} />;
}
