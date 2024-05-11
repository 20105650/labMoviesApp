import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
//import { TvshowT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvshowReviews from '../tvshowReviews'

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieImage, TvshowT } from "../../types/interfaces";
import { useQuery } from "react-query";
import { getTvshowImages } from "../../api/tmdb-api";
import Spinner from '../spinner';

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: { 
      position: "fixed",
      top: 50,
      right: 2,
    },
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 200,
        height: '30vh',
        overflow: "hidden",
    },
    imageContainer: {
        overflow: "hidden", // Hide the scrollbar
    },
};

const TvshowDetails: React.FC<TvshowT> = (props) => {
  const tvshow=props;
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", tvshow.id],
    () => getTvshowImages(tvshow.id)
    );
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as MovieImage[];

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvshow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvshow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvshow.episode_run_time} min.`} />
                
                <Chip
                    icon={<StarRate />}
                    label={`${tvshow.vote_average} (${tvshow.vote_count}`}
                />
                <Chip label={`Released: ${tvshow.first_air_date}`} />
            </Paper>

            <Grid item >
                    <div>
                        <ImageList cols={4}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
            </Grid>

            <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TvshowReviews {...tvshow} />
      </Drawer>
        </>
    );
};
export default TvshowDetails;