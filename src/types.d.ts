export interface DataType {
  id: string;
  name: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  image: string;
  meaning: string;
  remarks: string;
}
