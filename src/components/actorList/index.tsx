import React from "react";
import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";
import { ListedActor } from "../../types/interfaces";

interface ActorListProps {
  actors: ListedActor[],
  action: (m: ListedActor) => React.ReactNode;
}

const ActorList: React.FC<ActorListProps> = (props) => {
  const actors=props.actors;
  let actorCards = actors.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} >
      <Actor key={m.id} actor={m}  action={props.action}/>
    </Grid>
  ));
  return actorCards;
}

  export default ActorList;