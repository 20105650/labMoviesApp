import React, { useState }  from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  ratingFilter,
  popularityFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import Pagination from "../components/Pagination";


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

//const sortFiltering = {
  //name: "sort",
  //value: "",
  //condition: sortFilter,
//};

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["discover", currentPage],
    () => getMovies(currentPage),
    {
      keepPreviousData: true, // Keep previous data while loading new data
    }
  );
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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem("favourites", JSON.stringify(favourites));
  

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        popularityFilter={filterValues[3].value}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
export default HomePage;