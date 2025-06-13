import React from "react";

const Select = ({
  options,
}: {
  options: { value: string; name: string }[];
}) => {
  return (
    <select className="appearance-none border-0 px-3 py-2 text-sm text-gray-600 cursor-pointer pr-8 outline-0">
      {options.map((item, index: number) => {
        return (
          <option key={Date.now() + index} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
