import React from "react";

const FinancialDataCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default FinancialDataCard;
