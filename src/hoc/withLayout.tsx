import React from "react";
import HeaderBar from "src/components/HeaderBar";

export const withLayout = (Component: React.FC) => {
  return () => {
    return (
      <div className="p-4 d-flex flex-column min-vh-100">
        <HeaderBar />
        <Component />
      </div>
    );
  };
};
