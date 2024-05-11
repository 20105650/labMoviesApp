import { FC, useState, useEffect } from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//import HomeIcon from "@mui/icons-material/Home";
import { TvshowT } from "../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TvshowHeader: FC<TvshowT> = (props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve movies from localStorage
    const tvshows = JSON.parse(localStorage.getItem("favourites") || '[]');

    // Check if the movie with the given id exists in favorites
    const favorite = tvshows.find((tvshow: any) => tvshow.id === props.id);
    
    // Update isFavorite state based on whether the movie is in favorites
    setIsFavorite(!!favorite);
  }, [props.id]);
  return (
    <Paper component="div" sx={styles.root}>
      

      <Typography variant="h4" component="h3"> 
      {isFavorite && (
        <Avatar sx={{ backgroundColor: 'red' }}>
        <FavoriteIcon fontSize="large" />
      </Avatar>
      )}
        {props.name}{"   "}
    
        <span>{`${props.tagline}`} </span>
      </Typography>
    
    </Paper>
  );
};

export default TvshowHeader;