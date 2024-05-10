import React from "react";
import Tvshow from "../tvshowCard/";
import Grid from "@mui/material/Grid";
import { ListedTvshow } from "../../types/interfaces";

interface TvshowListProps {
  tvshows: ListedTvshow[],
  action: (m: ListedTvshow) => React.ReactNode;
}

const TvshowList: React.FC<TvshowListProps> = (props) => {
  const tvshows=props.tvshows;
  let tvshowCards = tvshows.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} >
      <Tvshow key={m.id} tvshow={m}  action={props.action}/>
    </Grid>
  ));
  return tvshowCards;
}

  export default TvshowList;