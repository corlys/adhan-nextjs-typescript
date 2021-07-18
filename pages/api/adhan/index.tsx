// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IDatetime } from "../../../model/PrayerAPI";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<IDatetime>) => {
  try {
    const city = req.query.city;
    const call = await fetch(
      `https://api.pray.zone/v2/times/today.json?city=${city}`
    );

    const {
      results: { datetime },
    } = await call.json();
    return res
      .status(200)
      .json({ times: datetime[0].times, date: datetime[0].date });
  } catch (error) {
    return res.status(400);
  }
};
