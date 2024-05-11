import React from "react";
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import { Actor } from "../../types/interfaces";

const styles = { 
    imageContainer: {
        overflow: "hidden", // Hide the scrollbar
    },
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
                    <ImageList cols={1}>
                    <div  style={styles.imageContainer}>
                        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={'Image alternative'} />
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

export default TemplateActorPage;