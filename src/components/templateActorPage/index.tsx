import React from "react";
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import { Actor } from "../../types/interfaces";
import img from '../../images/film-poster-placeholder.png';
import CardMedia from "@mui/material/CardMedia";

const styles = { 
    imageContainer: {
        overflow: "hidden", // Hide the scrollbar
    },
    media: { height: 500 },
};

interface TemplateActorPageProps {
    actor: Actor;
    children: React.ReactElement;
}


const TemplateActorPage: React.FC<TemplateActorPageProps> = (props) => {
    
    const { actor, children } = props;

    return (
        <>
            <ActorHeader {...actor} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={4}>
                <CardMedia
                    sx={styles.media}
                    image={
                        actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : img
                    }
                />
                </Grid>

                <Grid item xs={8}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateActorPage;