import React, { useState, useEffect } from "react";
import { IDatetime } from "../model/PrayerAPI";
import Head from "next/head";
import List from "../component/List";
import Loading from "../component/Loading";
import { GetStaticProps } from "next";

export default function Home({ times, date }: IDatetime) {
  const [city, setCity] = useState("");
  const [datetime, setDatetime] = useState<IDatetime>({
    times: times,
    date: date,
  });
  // console.log(times, date);
  // console.log(datetime);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setDatetime({
  //     times: staticDateTime.times,
  //     date: staticDateTime.date,
  //   });
  // }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/api/adhan?city=${city}`
    );
    const prayer = await response.json();
    setDatetime({ ...datetime, ...prayer });
    setCity("");
    setIsLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };
  return (
    <>
      <div className="w-full relative">
        <Head>
          <title>Adhan</title>
        </Head>
        <div className="absolute w-full h-full bg-indigo-400 opacity-60 top-0 left-0"></div>
        <div className="absolute z-20 flex flex-col items-center w-full justify-center h-full">
          <div className="text-white font-bold text-6xl">
            Dont Forget to Pray
          </div>
          <div className="text-white text-2xl mt-2 font-medium">
            Enter a city of choosing
          </div>
          <form
            className="mt-8 flex flex-col space-y-2"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className="w-full border-2 border-indigo-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={handleChange}
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 rounded-lg px-3 py-2 text-white w-full">
              Submit
            </button>
          </form>
        </div>
        <img src="https://picsum.photos/seed/picsum/1980/900" />
      </div>
      {isLoading && <Loading />}
      <List times={datetime.times} date={datetime.date} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IDatetime> = async (context) => {
  const res = await fetch(
    "https://api.pray.zone/v2/times/today.json?city=bekasi"
  );

  const {
    results: { datetime },
  } = await res.json();

  return {
    props: {
      times: datetime[0].times,
      date: datetime[0].date,
    },
  };
};
