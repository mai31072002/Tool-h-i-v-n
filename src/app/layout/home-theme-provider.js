import React, { Suspense } from "react";

export const HomeThemeProvider = ({ children }) => {
  return (
    <>
      <Suspense fallback={<span />}>{children}</Suspense>
    </>
  );
};

export default HomeThemeProvider;
