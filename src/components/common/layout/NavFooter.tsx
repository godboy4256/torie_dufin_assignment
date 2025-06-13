import Image from "next/image";
import React from "react";

const NavFooter = ({ active }: { active: string }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white">
      <ul className="flex">
        {["메인", "금융퀴즈", "모의투자", "커뮤니티", "내정보"].map(
          (text: string, index: number) => {
            return (
              <li
                key={index + Date.now()}
                className="w-[20%] pb-6 flex justify-center items-center flex-col"
              >
                <div
                  className={`w-[60%] ${
                    active === text ? "bg-amber-600" : ""
                  } mb-6 h-[2px]`}
                />
                <Image
                  src={`/images/nav_icon_0${index + 1}.svg`}
                  alt={`nav_icon_0${index + 1}`}
                  width={20}
                  height={20}
                />
                <div
                  className={`${
                    active === text ? "text-black" : "text-gray-600"
                  } mt-2`}
                >
                  {text}
                </div>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
};

export default NavFooter;
