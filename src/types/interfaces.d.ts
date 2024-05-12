export interface BaseMovie {
    title: string;
    budget: number;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    playlists?: unknown;
  }

  export interface BaseMovieList { 
    movies: BaseMovie[];
  }   
  export interface MovieT extends BaseMovie {
    genres: {
      id: number;
      name: string;
    }[],
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  }
  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  export interface ListedMovie extends BaseMovie {
    genre_ids: number[];

  }
  export type FilterOption = "title" | "genre";

  export interface MovieListPageTemplateProps {
    movies: ListedMovie[];
    title: string;
    action: (m: ListedMovie) => ReactNode;
  }
  export interface Review{
    id: string;
    content: string
    author: string
  }
  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }

  interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
  }
  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface TVShow {
    backdrop_path: string;
    first_air_date: string;
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    tagline: string;
    episode_run_time: number;
    vote_average: number;
    vote_count: number;
    favourite?: boolean;
  }  
  export interface TVShowList { 
    tvshows: TVShow[];
  } 
  export interface TvshowListPageTemplateProps {
    tvshows: ListedTvshow[];
    title: string;
    action: (m: ListedTvshow) => ReactNode;
  }
  export interface TvshowT extends TVShow {
    genres: {
      id: number;
      name: string;
    }[],
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  }
  export interface TvshowImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  export interface ListedTvshow extends TVShow {
    genre_ids: number[];

  }
  interface DiscoverTvShows {
    page: number;	
    total_pages: number;
    total_results: number;
    results: TVShow[];
  }
  interface Actor {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    gender: number;
    media_type: string;
    original_language: string;
    original_title: string;
    biography: string;
    profile_path: string | null;
    birthday: string;
    place_of_birth: string;
    name: string;
    video: boolean;
    popularity: number;
    vote_count: number;
    favourite?: boolean;
    known_for_department: string;
    imdb_id: string;
    known_for: KnownFor[];
  }

  export interface ListedActor extends Actor {
    genre_ids: number[];

  }
  export interface ActorList { 
    actors: Actor[];
  } 
  export interface ActorListPageTemplateProps {
    actors: ListedActor[];
    title: string;
    action: (m: ListedActor) => ReactNode;
  }
  interface DiscoverActors {
    page: number;	
    total_pages: number;
    total_results: number;
    results: Actor[];
  }
  export interface ActorImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }

  export interface KnownFor {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
    media_type: string;
  }
  
