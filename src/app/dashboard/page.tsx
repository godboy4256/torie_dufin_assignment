"use client";

import Calendar from "@/components/common/input/Calendar";
import Chart from "@/components/common/input/Chart";
import Select from "@/components/common/input/Select";
import DashBoardLogo from "@/components/units/dashboard/DashBoardLogo";
import FinancialDataCard from "@/components/units/dashboard/FinancialDataCard";
import ReturnStatusCard from "@/components/units/dashboard/ReturnStatusCard";

import Image from "next/image";
import React from "react";

const App: React.FC = () => {
  const returnStatus = [
    { title: "이달수익률", value: -3 },
    { title: "누적수익률", value: 23 },
    { title: "손익금액액", value: 25340 },
  ];

  const financialData = [
    { title: "금융지능순위", value: "9위" },
    { title: "정답율", value: "97%" },
    { title: "학습량", value: "70%" },
    {
      title: "총 학습 Gold",
      value: (150000).toLocaleString(),
    },
  ];

  return (
    <div className="min-h-screen  p-4 font-['Inter']">
      <div className="max-w-6xl mx-auto bg-[#f5f6fb] shadow-lg rounded-xl overflow-hidden p-6 md:p-8">
        <div className="flex items-center space-x-2 mb-6">
          <DashBoardLogo />
        </div>

        <h2 className="text-2xl font-medium mb-6">반갑습니다 토리님</h2>

        <div className="md:flex justify-between mb-9">
          <div className="md:w-[65%]">
            <div className="flex-col-reverse w-full flex-none h-fit bg-[#355fff] py-[35px] pl-[20px] md:py-[55px] md:pl-[35px] text-white rounded-[10px] shadow-md mb-8 relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white rounded-xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-lg mb-1">토리에듀핀과 함께</p>
                  <p className="text-3xl font-medium mb-2">총 35 일</p>
                  <p className="text-sm">가입 2023.08.01</p>
                </div>
                <div className="hidden md:block"></div>
              </div>
              <Image
                src="/images/main_image.png"
                alt="main image"
                width={300}
                height={200}
                className="md:absolute bottom-0 right-0"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              {financialData.map((item, index) => {
                return (
                  <FinancialDataCard
                    key={index + Date.now()}
                    value={item.value}
                    title={item.title}
                  />
                );
              })}
            </div>
          </div>
          <Calendar />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Image
                  src="/images/revenue.svg"
                  alt="revenue icon svg"
                  width={20}
                  height={10}
                  className="mr-1"
                />
                <span>수익률 현황</span>
              </h3>
            </div>
            <div className="relative inline-block">
              <Select
                options={[
                  { value: "daily", name: "일별" },
                  { value: "weekly", name: "주별" },
                  { value: "monthly", name: "월별" },
                ]}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
          <Chart />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {returnStatus.map((item, index: number) => {
              return (
                <ReturnStatusCard
                  key={Date.now() + index}
                  title={item.title}
                  value={item.value}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
