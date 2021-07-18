import React from "react";
import { IDate, IDatetime } from "../model/PrayerAPI";

const List: React.FC<IDatetime> = ({ times, date }) => {
  // console.log(date);
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        {Object.entries(times).map(([key, value]) => (
          <div
            key-={key}
            className="container border-2 border-gray-600 hover:border-indigo-500"
          >
            {`Waktu ${key}:${value}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
