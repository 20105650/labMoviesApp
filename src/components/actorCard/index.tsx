import React from "react";
import  { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import { ActorsContext } from "../../contexts/actorsContext";
import { ListedActor } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 445 },
  media: { height: 500 },
  avatar: { backgroundColor: "rgb(255, 0, 0)" },   // Change color as per your preference
  title: { color: "#1976d2", fontWeight: 'bold', textTransform: "uppercase", fontSize:18  },
};


interface ActorListProps {
  actor:ListedActor,
  action: (m: ListedActor) => React.ReactNode;
}
const ActorCard: React.FC<ActorListProps> = (props) => {
  const actor = {...props.actor, favourite: false};
  const { favourites } = useContext(ActorsContext);
  
  if (favourites.find((id) => id === actor.id)) 
    actor.favourite = true;
 


  return (
    <Card sx={styles.card} elevation={0} variant="outlined">
      <CardMedia
        sx={styles.media}
        image={
            actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
        <Typography variant="h6" component="p" sx={styles.title}>
            {actor.name}{" "}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {props.action(actor)}
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ActorCard;