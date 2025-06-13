import React from "react";

const ReturnStatusCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div className="flex bg-white p-5 rounded-lg items-center justify-between">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-2xl font-bold ${
          value < 0 ? "text-[#3e66ff]" : "text-red-500"
        }`}
      >
        {value}%
      </p>
    </div>
  );
};

export default ReturnStatusCard;
