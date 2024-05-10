import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TvshowList from "../tvshowList";
import {  TvshowListPageTemplateProps} from "../../types/interfaces";
import { Box } from "@mui/material";

const styles = {
  root: { 
    
  }
};

const TVShowsListPageTemplate: React.FC<TvshowListPageTemplateProps> = (props)=> {
  return (
    <Box sx={{padding:4}}>
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={2}>
      <TvshowList action={props.action} tvshows={props.tvshows} />
      </Grid>
    </Grid>
    </Box>
  );
}
export default TVShowsListPageTemplate;