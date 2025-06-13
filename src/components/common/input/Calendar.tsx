"use client";

import React, { useState, useMemo } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  const currentYear = currentDate.getFullYear();
  const currentMonthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });
  const currentMonthIndex = currentDate.getMonth();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const allDatesInMonth = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonthIndex);
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    return dates;
  }, [currentYear, currentMonthIndex]);

  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    if (day === null) return;

    const clickedDate = new Date(currentYear, currentMonthIndex, day);
    const dateString = clickedDate.toISOString().split("T")[0];

    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = new Set(prevSelectedDates);
      if (newSelectedDates.has(dateString)) {
        newSelectedDates.delete(dateString);
      } else {
        newSelectedDates.add(dateString);
      }
      return newSelectedDates;
    });
  };

  const selectedDatesInCurrentMonthCount = useMemo(() => {
    const currentMonthFormatted = `${currentYear}-${String(
      currentMonthIndex + 1
    ).padStart(2, "0")}`;
    let count = 0;
    selectedDates.forEach((dateString) => {
      if (dateString.startsWith(currentMonthFormatted)) {
        count++;
      }
    });
    return count;
  }, [selectedDates, currentYear, currentMonthIndex]);

  const getKoreanMonthName = (monthIndex: number) => {
    const monthNames = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return monthNames[monthIndex];
  };

  return (
    <div className="bg-white rounded-xl max-w-md transform transition-all duration-300 w-full md:w-fit px-8 pt-8 h-fit">
      <div className="flex justify-around items-center mb-5">
        <button
          onClick={goToPrevMonth}
          className="outline-none transition duration-200 cursor-pointer"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
              color="##595959"
            />
          </svg>
        </button>
        <div className="font-bold text-[#595959] flex items-center space-x-2">
          <span>{currentMonthName}</span>
          <span>{currentYear}</span>
        </div>
        <button
          onClick={goToNextMonth}
          className="outline-none transition duration-200 cursor-pointer"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
              color="#595959"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[13px] font-semibold text-[#595959] mb-4">
        {weekdays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {allDatesInMonth.map((day, index) => {
          const dateString =
            day !== null
              ? new Date(currentYear, currentMonthIndex, day)
                  .toISOString()
                  .split("T")[0]
              : null;
          const isSelected = dateString && selectedDates.has(dateString);

          return (
            <div
              key={index}
              className={`
                flex items-center text-[13px] relative justify-center p-2 text-[#c7c7c7] cursor-pointer
                  ${isSelected ? "text-black" : ""}
                  transition duration-150 ease-in-out
                `}
              onClick={() => handleDateClick(day!)}
            >
              {isSelected && (
                <div className="w-[4px] h-[4px] absolute left-[50%] top-2 transform translate-[-50%] rounded-full bg-[#36457f]"></div>
              )}
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center flex items-center justify-center p-5 border-t border-[#c7c7c7]">
        <span className="text-[16px] mr-2.5">
          {getKoreanMonthName(currentMonthIndex)} 출석
        </span>

        <span className="font-bold text-[17px]">
          <span className="mr-0.5">총</span>
          <span> {selectedDatesInCurrentMonthCount}일</span>
        </span>
      </div>
    </div>
  );
};

export default Calendar;
