export interface IPrayerTimes {
  Imsak: string;
  Sunrise: string;
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha?: string;
  Midnight: string;
}

export interface IDate {
  timestamp: number;
  gregorian: string;
  hijri: string;
}

export interface IDatetime {
  times: IPrayerTimes;
  date: IDate;
}

export interface Location {
  latitude: number;
  longitude: number;
  elevation: number;
  city?: string;
  country: string;
  country_code: string;
  timezone: string;
  local_offset: number;
}

export interface Settings {
  timeformat: string;
  school: string;
  juristic: string;
  highlat: string;
  fajr_angle: number;
  isha_angle: number;
}

export interface Results {
  datetime: IDatetime[];
  location: Location;
  settings: Settings;
}
