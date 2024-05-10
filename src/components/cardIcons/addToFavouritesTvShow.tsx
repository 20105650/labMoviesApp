import React, {MouseEvent, useContext} from "react";
import { TvShowsContext } from "../../contexts/tvshowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ListedTvshow} from "../../types/interfaces"

const AddToFavouritesTVIcon: React.FC<ListedTvshow> = (tvshow) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(tvshow);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesTVIcon;