export type RandomUserResponse = {
  results: Array<User>;
  info: Info;
};

export type UserCacheResponse = {
  expiredAt?: number | null;
  data: Array<User>;
  createdAt?: number | null;
};

export type Info = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

export type User = {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
};

type Dob = {
  date: Date;
  age: number;
};

enum Gender {
  Female = 'female',
  Male = 'male',
}

type ID = {
  name: string;
  value: null | string;
};

type Location = {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
};

type Coordinates = {
  latitude: string;
  longitude: string;
};

type Street = {
  number: number;
  name: string;
};

type Timezone = {
  offset: string;
  description: string;
};

type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

type Name = {
  title: Title;
  first: string;
  last: string;
};

enum Title {
  MS = 'Ms',
  Miss = 'Miss',
  Monsieur = 'Monsieur',
  Mr = 'Mr',
  Mrs = 'Mrs',
}

type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};
