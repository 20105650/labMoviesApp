import React from "react"; 
import PageTemplate from '../components/templateActorsListPage';
import { getActors} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, { titleFilter,  genreFilter,} from '../components/actorFilterUI';
import { DiscoverActors,ListedActor } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesActor'

const styles = {
    root: {
      padding: "20px",
    }, fab: {
      marginTop: 8,
      position: "fixed",
      top: 2,
      right: 2,
    },
  };
  
  const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
  };
  const  genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
  };
  
    //const TrendingMoviesPage: React.FC = () => {
    const ActorsPage: React.FC = () => {
        const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>("actors", getActors);
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
  
        const actors = data ? data.results : [];
        const displayedActors = filterFunction(actors);
  
        // Redundant, but necessary to avoid app crashing.
        const favourites = actors.filter(m => m.favourite)
        localStorage.setItem("favourites", JSON.stringify(favourites));
        const addToFavourites = (actorId: number) => true;
  
  
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
          genreFilter={filterValues[1].value}
        />
        </>
    );
  };
  export default ActorsPage;