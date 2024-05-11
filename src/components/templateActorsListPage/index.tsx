import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { ActorListPageTemplateProps} from "../../types/interfaces";
import { Box } from "@mui/material";

const styles = {
  root: { 
    
  }
};

const ActorsListPageTemplate: React.FC<ActorListPageTemplateProps> = (props)=> {
  return (
    <Box sx={{padding:4}}>
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={2}>
      <ActorList action={props.action} actors={props.actors} />
      </Grid>
    </Grid>
    </Box>
  );
}
export default ActorsListPageTemplate;