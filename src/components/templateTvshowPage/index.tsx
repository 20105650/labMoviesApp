import React, { useState, useEffect } from "react";
import TvshowHeader from "../headerTvshow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import { TvshowT } from "../../types/interfaces";

const styles = { 
    imageContainer: {
        overflow: "hidden", // Hide the scrollbar
    },
};

interface TemplateTvshowPageProps {
    tvshow: TvshowT;
    children: React.ReactElement;
}


const TemplateTvshowPage: React.FC<TemplateTvshowPageProps> = (props) => {
    
    const { tvshow, children } = props;

    return (
        <>
            <TvshowHeader {...tvshow} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={4}>
                    <ImageList cols={1}>
                    <div  style={styles.imageContainer}>
                        <img src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`} alt={'Image alternative'} />
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

export default TemplateTvshowPage;