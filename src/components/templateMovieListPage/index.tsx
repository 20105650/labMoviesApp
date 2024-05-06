import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";
import { Box } from "@mui/material";

const styles = {
  root: { 
    
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = (props)=> {
  return (
    <Box sx={{padding:4}}>
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={2}>
      <MovieList action={props.action} movies={props.movies} />
      </Grid>
    </Grid>
    </Box>
  );
}
export default MovieListPageTemplate;