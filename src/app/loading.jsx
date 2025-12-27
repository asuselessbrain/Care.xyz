import Logo from "@/components/layouts/Logo";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <div className="animate-ping">
        <Logo></Logo>
      </div>
    </div>
  );
};

export default loading;
