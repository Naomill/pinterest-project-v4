export interface Pin {
  id: string;
  image: string;
  title: string;
  description?: string;
  link?: string;
  board?: string;
  createdBy?: string;
}

export interface User {
  id: string;
  savedPins: string[];
  createdPins: string[];
}