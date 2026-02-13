export interface IMovie {
  content: string;
  path: string;
  rating: number;   // keep string because your JSON has "9"
  title: string;
  movieId : string
}