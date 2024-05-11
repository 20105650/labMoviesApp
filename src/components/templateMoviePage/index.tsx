import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import { MovieT } from "../../types/interfaces";


const styles = {
    imageContainer: {
        overflow: "hidden", // Hide the scrollbar
    },
};

interface TemplateMoviePageProps {
    movie: MovieT;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = (props) => {
    
    const { movie, children } = props;

    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={4}>
                    <ImageList cols={1}>
                    <div  style={styles.imageContainer}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'Image alternative'} />
                    </div>
                    </ImageList>
                </Grid>

                <Grid item xs={8}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;