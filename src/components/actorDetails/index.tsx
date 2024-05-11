import React from "react";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
//import { MovieT } from "../../types/interfaces";
//import NavigationIcon from "@mui/icons-material/Navigation";
//import Fab from "@mui/material/Fab";
//import Drawer from "@mui/material/Drawer";
import { ActorImage, Actor } from "../../types/interfaces";
import { useQuery } from "react-query";
import { getActorImages } from "../../api/tmdb-api";
import Spinner from '../spinner';

const ActorDetails: React.FC<Actor> = (props) => {
  const actor=props;

  const { data, error, isLoading, isError } = useQuery<ActorImage[], Error>(
    ["images", actor.id],
    () => getActorImages(actor.id)
    );
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as ActorImage[]; 
    console.log(images);

    return (
        <>
            <Typography variant="h5" component="h3"> Overview</Typography>

            <Typography component="p">
                Biography: <span>{actor.biography}</span>
            </Typography>
            <Box component="section" >
                <div className="details-grid">
                    <Typography variant="h5" component="h3"> Personal Info </Typography>
                    
                    <div className="details-container">
                        <div className="details-title">Name : {actor.name}</div>
                    </div>
                </div>
            </Box>
        </>
    );
};
export default ActorDetails;