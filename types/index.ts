export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
}

export interface PopularMovie {
  $id: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string | null;
  release_date?: string | null;
  runtime?: number | null;
  vote_average?: number | null;
  vote_count?: number | null;
  budget?: number | null;
  revenue?: number | null;
  genres?: { id: number; name: string }[] | null;
  production_companies?: { id: number; name: string }[] | null;
}

export interface PopularCardProps {
  movie: PopularMovie;
  index: number;
}
