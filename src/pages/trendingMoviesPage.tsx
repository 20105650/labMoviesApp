import React from "react"; 
import PageTemplate from '../components/templateMovieListPage';
import { ListedMovie } from "../types/interfaces";
import { getTrendingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
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

  //const TrendingMoviesPage: React.FC = () => {
  const TrendingMoviesPage: React.FC = () => {
      const { data, error, isLoading, isError } = useQuery<ListedMovie, Error>("trending", getTrendingMovies);
      const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering]
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
            ? [changedFilter, filterValues[1]]
            : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
      };

      const movies = data ? data : [];
      const displayedMovies = filterFunction(movies);

      // Redundant, but necessary to avoid app crashing.
     // const playlists = movies.filter((m: ListedMovie) => m.playlists)
    // const playlists = Array.isArray(movies) ? movies.filter((m: ListedMovie) => m.playlists) : [];
      //localStorage.setItem("playlists", JSON.stringify(playlists));
      //const addToPlayList= (movieId: number) => true;


    return (
      <>
      <PageTemplate
      title='Trending Movies'
      movies={displayedMovies}
      action={(movie: ListedMovie) => {
        return <AddToPlayListIcon {...movie} />
      }}
    />
    <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      </>
  );
};
export default TrendingMoviesPage;