import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
//import { MovieT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import { Link } from "react-router-dom";


import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieImage, MovieT } from "../../types/interfaces";
import { useQuery } from "react-query";
import { getMovieImages } from "../../api/tmdb-api";
import Spinner from '../spinner';

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 2,
    },
    chipLabel: {
        margin: 1,
    },
    fab: { 
      position: "fixed",
      top: 50,
      right: 2,
    },
    chipValue: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin:2
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
    chipLink:{
        color:'blue'
    }
};

const MovieDetails: React.FC<MovieT> = (props) => {
  const movie=props;
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getMovieImages(movie.id)
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
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`} sx={styles.chipValue}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`} sx={styles.chipValue} 
                />
                <Chip label={`Released: ${movie.release_date}`} sx={styles.chipValue} />
                
                <Link to={movie.homepage}> <Chip label={`Visit Homepage`} sx={styles.chipLink}/> </Link>
            </Paper>

            

            <Grid item >
                    <div>
                        <ImageList cols={4}>
                            {images.slice(0, 4).map((image: MovieImage) => (
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
        <MovieReviews {...movie} />
      </Drawer>
        </>
    );
};
export default MovieDetails;