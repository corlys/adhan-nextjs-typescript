import React from "react";
import { IDate, IDatetime } from "../model/PrayerAPI";

const List: React.FC<IDatetime> = ({ times, date }) => {
  // console.log(date);
  return (
    <div className="w-full">
      <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-8 gap-4">
        {Object.entries(times).map(([key, value]) => (
          <div className="rounded-xl shadow-xl" key={key}>
            <div className="flex flex-col p-2 border border-indigo-600 rounded-xl items-center">
              <div className="uppercase text-indigo-500 font-bold text-2xl">{key}</div>
              <div className="text-indigo-500 font-bold text-xl">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
