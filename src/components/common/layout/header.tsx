import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white md:hidden px-3 py-5">
      <h1 className="flex items-center">
        <Image
          width={30}
          height={20}
          src="/images/logo_toriedufin.png"
          alt="company logo"
        />
        <div className="font-bold ml-2 text-xl">Tori-edufin</div>
      </h1>
    </header>
  );
};

export default Header;
