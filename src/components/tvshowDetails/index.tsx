import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
//import { TvshowT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvshowReviews from '../tvshowReviews'
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieImage, Season, TvshowT } from "../../types/interfaces";
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
        margin: 2,
    },
    chip: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        margin: 1,
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
                    label={`${tvshow.vote_average} (${tvshow.vote_count})`} sx={styles.chip}
                />
                <Chip label={`Released: ${tvshow.first_air_date}`} sx={styles.chip} />
                <Chip label={`Episodes: ${tvshow.number_of_episodes}`} sx={styles.chip} />
                <Chip label={`Seasons: ${tvshow.number_of_seasons}`}  sx={styles.chip} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
            <div style={{ textAlign: "center",width: "100%",fontWeight:900, color:"black", fontSize:25,margin:3}} >Seasons</div>
            {tvshow.seasons.map((season: Season) => (
                
                <div style={{display: "flex", flexDirection: "column", alignItems: "left", margin:3 }}>
                 <Link to={`/movies/${season.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} alt="Square Image" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                 </Link>
                 <Link to={`/movies/${season.id}`} style={{ textDecoration: "none", color: "black" }}>{season.name}</Link>
                </div>
            ))}

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