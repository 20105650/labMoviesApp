import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvshowDetails";
import { TvshowT} from "../types/interfaces";
import PageTemplate from "../components/templateTvshowPage";
import useTvshow from "../hooks/useMovie";
import { getTvshow } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const TvshowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: tvshow, error, isLoading, isError } = useQuery<TvshowT, Error>(
    ["tvshow", id],
    ()=> getTvshow(id||"")
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvshow ? (
        <>
        <PageTemplate tvshow={tvshow as TvshowT}> 
          <TvShowDetails {...tvshow as TvshowT} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for tvshow details</p>
    )}
    </>
  );
};

export default TvshowDetailsPage;