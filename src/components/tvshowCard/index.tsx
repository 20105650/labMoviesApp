import React, {MouseEvent} from "react";
import  { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { TVShow } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { TvShowsContext } from "../../contexts/tvshowsContext";
import { ListedTvshow } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 445 },
  media: { height: 500 },
  avatar: { backgroundColor: "rgb(255, 0, 0)" },   // Change color as per your preference
  title: { color: "#1976d2", fontWeight: 'bold', textTransform: "uppercase", fontSize:18 , height: 60 },
};

interface TvshowCardProps extends TVShow {
  selectFavourite: (tvshowId: number) => void;
} 

interface TvshowListProps {
    tvshow: ListedTvshow,
    action: (m: ListedTvshow) => React.ReactNode;
}
const TvshowCard: React.FC<TvshowListProps> = (props) => {
  const tvshow = {...props.tvshow, favourite: false};
  const { favourites, addToFavourites } = useContext(TvShowsContext);
  
  if (favourites.find((id) => id === tvshow.id)) 
    tvshow.favourite = true;
 


  return (
    <Card sx={styles.card} elevation={0} variant="outlined">
      <CardHeader
        avatar={
            tvshow.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={styles.title}>
            {tvshow.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
            tvshow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small"  sx={{ mr : 0.5}}/>
              {tvshow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvshow.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {props.action(tvshow)}
        <Link to={`/tvshows/${tvshow.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TvshowCard;