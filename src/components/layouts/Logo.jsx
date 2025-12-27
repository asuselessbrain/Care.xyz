import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        alt="logo-care-xyz"
        src={"/assets/logo.png"}
        width={50}
        height={40}
      />
      <h2 className="text-xl font-bold">
        Care<span className="text-primary">.xyz</span>
      </h2>
    </Link>
  );
};

export default Logo;
