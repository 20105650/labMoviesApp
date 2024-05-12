import React from "react"; 
import PageTemplate from '../components/templateTVShowsListPage';
import { getTvShows} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvshowFilterUI, { titleFilter,  genreFilter,ratingFilter} from "../components/tvshowFilterUI";
import { DiscoverTvShows,ListedTvshow } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesTvShow';
  
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
    //const TrendingMoviesPage: React.FC = () => {
    const TvShowsPage: React.FC = () => {
        const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>("tvshows", getTvShows);
        const { filterValues, setFilterValues, filterFunction } = useFiltering(
          [],
          [titleFiltering, genreFiltering,ratingFiltering]
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
              ? [changedFilter, filterValues[1],filterValues[2]]
              : type === "genre"
              ? [filterValues[0], changedFilter,filterValues[2]]
              : [filterValues[0],filterValues[1],changedFilter];
          setFilterValues(updatedFilterSet);
        };
  
        const tvshows = data ? data.results : [];
        const displayedTvshows = filterFunction(tvshows);
  
        // Redundant, but necessary to avoid app crashing.
        const favourites = tvshows.filter(m => m.favourite)
        localStorage.setItem("favourites", JSON.stringify(favourites));
       // const addToFavourites = (tvshowId: number) => true;
  
  
      return (
        <>
        <PageTemplate
        title='TV Shows'
        tvshows={displayedTvshows}
        action={(tvshow: ListedTvshow) => {
          return <AddToFavouritesIcon {...tvshow} />
        }}
      />
      <TvshowFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
          ratingFilter={filterValues[2].value}
        />
        </>
    );
  };
  export default TvShowsPage;