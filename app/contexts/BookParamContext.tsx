import type { BookParam } from "@/features/book/types";
import React, { createContext, useContext, useState } from "react";

export const INITIAL_DETAILED_QUERY: BookParam = {
  target: "",
  query: "",
};

const BookParamContext = createContext<{
  bookParam: BookParam;
  setBookParam: React.Dispatch<React.SetStateAction<BookParam>>;
} | null>(null);

export const BookParamProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookParam, setBookParam] = useState<BookParam>(INITIAL_DETAILED_QUERY);

  return (
    <BookParamContext.Provider value={{ bookParam, setBookParam }}>
      {children}
    </BookParamContext.Provider>
  );
};

export const useBookParam = () => {
  const context = useContext(BookParamContext);
  if (context === null) {
    throw new Error("useBookParam should be used within BookParamProvider");
  }
  return context;
};
