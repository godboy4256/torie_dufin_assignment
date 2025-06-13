import Image from "next/image";
import React from "react";

const DashBoardLogo = () => {
  return (
    <h1 className="text-xl font-medium text-[#f4b615] flex">
      <Image src="/images/logo_gold.svg" width={30} height={1} alt="logo" />
      GOLD
    </h1>
  );
};

export default DashBoardLogo;
