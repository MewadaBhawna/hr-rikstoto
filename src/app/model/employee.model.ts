export interface Employee {
  id: Id;
  name: Name;
  email: string;
  location: Location;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  picture: Picture;
  isFlagged: boolean;
}

export interface Id {
  name: string;
  value: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Dob {
  date: string;
  age: number;
}

export interface Registered {
  date: string;
  age: number;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
