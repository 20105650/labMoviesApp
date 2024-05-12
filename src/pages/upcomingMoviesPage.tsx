import React from "react"; 
import PageTemplate from '../components/templateMovieListPage';
import { ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  ratingFilter,
  popularityFilter,
} from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlayListIcon from '../components/cardIcons/AddToPlayListIcon';

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const ratingFiltering = {
  name: "rating",
  value: "0",
  condition: ratingFilter,
};
const popularityFiltering = {
  name: "popularity",
  value: "0",
  condition: popularityFilter,
};

  //const UpcomingMoviesPage: React.FC = () => {
  const UpcomingMoviesPage: React.FC = () => {
      const { data, error, isLoading, isError } = useQuery<ListedMovie, Error>("upcoming", getUpcomingMovies);
      const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering, ratingFiltering, popularityFiltering]
      );
    
      if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{error.message}</h1>;
      }

      const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
        type === "title"
        ? [changedFilter, filterValues[1], filterValues[2], filterValues[3]]
        : type === "genre"
        ? [filterValues[0], changedFilter, filterValues[2], filterValues[3]]
        : type === "rating"
        ? [filterValues[0], filterValues[1],changedFilter, filterValues[3] ] 
        :[filterValues[0], filterValues[1], filterValues[2],changedFilter ];
        setFilterValues(updatedFilterSet);
      };

      const movies = data ? data : [];
      const displayedMovies = filterFunction(movies);

      // Redundant, but necessary to avoid app crashing.
     // const playlists = movies.filter(m => m.playlists)
     // localStorage.setItem("playlists", JSON.stringify(playlists));
     // const addToPlayList= (movieId: number) => true;


    return (
      <>
      <PageTemplate
      title='Upcoming Movies'
      movies={displayedMovies}
      action={(movie: ListedMovie) => {
        return <AddToPlayListIcon {...movie} />
      }}
    />
    <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        popularityFilter={filterValues[3].value}
      />
      </>
  );
};
export default UpcomingMoviesPage;