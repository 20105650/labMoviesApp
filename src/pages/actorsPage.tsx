import React, { useState }  from "react";
import PageTemplate from '../components/templateActorsListPage';
import { getActors} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, { titleFilter} from '../components/actorFilterUI';
import { DiscoverActors,ListedActor } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesActor'
import Pagination from "../components/Pagination";


  
  const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
  };

  
    //const TrendingMoviesPage: React.FC = () => {
    const ActorsPage: React.FC = () => {
        const [currentPage, setCurrentPage] = useState(1);console.log(setCurrentPage);
        const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(["actors", currentPage],
        () => getActors(currentPage),
        {
          keepPreviousData: true, // Keep previous data while loading new data
        }
      );
        const { filterValues, setFilterValues, filterFunction } = useFiltering(
          [],
          [titleFiltering]
        );
      
        if (isLoading) {
          return <Spinner />;
        }
      
        if (isError) {
          return <h1>{error.message}</h1>;
        }
  
        const changeFilterValues = (type: string, value: string) => {
          const changedFilter = { name: type, value: value };
          const updatedFilterSet = [changedFilter];
          setFilterValues(updatedFilterSet);
        };
  
        const actors = data ? data.results : [];
        const displayedActors = filterFunction(actors);
  
        // Redundant, but necessary to avoid app crashing.
        const favourites = actors.filter(m => m.favourite)
        localStorage.setItem("favourites", JSON.stringify(favourites));
        
  
      return (
        <>
        <PageTemplate
        title='Popular Actors'
        actors={displayedActors}
        action={(actor: ListedActor) => {
          return <AddToFavouritesIcon {...actor} />
        }}
      />
      <ActorFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
         
        />
        <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={setCurrentPage}
      />
        </>
    );
  };
  export default ActorsPage;