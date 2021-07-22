import React, { useState, useEffect } from "react";
import { IDatetime } from "../model/PrayerAPI";
import Head from "next/head";
import List from "../components/List";
import Loading from "../components/Loading";
import { GetStaticProps } from "next";

export default function Home({ times, date }: IDatetime) {
  const [city, setCity] = useState("");
  const [datetime, setDatetime] = useState<IDatetime>({
    times: times,
    date: date,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/adhan?city=${city}`);
      const prayer = await response.json();
      setDatetime({ ...datetime, ...prayer });
    } catch (error) {
      console.log(error);
    }
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
          <div className="text-white font-bold sm:text-2xl md:text-4xl lg:text-6xl">
            Dont Forget to Pray
          </div>
          <div className="text-white md:text-xl lg:text-2xl mt-2 font-medium">
            Enter a city of choosing
          </div>
          <form
            className="mt-8 flex sm:flex-row md:flex-col sm:items-center md:space-y-2"
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
            <button className="bg-blue-500 hover:bg-blue-400 rounded-lg px-3 py-2 text-white w-1/2">
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
