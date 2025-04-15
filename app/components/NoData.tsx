import React from "react";

interface Props {
  message: string;
}

export default function NoData({ message }: Props) {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center py-[80px]">
      <img className="w-[80px] h-[80px]" src="/icon_book.png" alt="no-data" />
      <p className="caption text-txt-secondary">{message}</p>
    </div>
  );
}
