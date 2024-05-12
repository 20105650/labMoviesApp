import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedMovie } from "../../types/interfaces";

export const titleFilter = function (movie: ListedMovie, value: string) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: ListedMovie, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

//export const sortFilter = function (movie: ListedMovie, value: string) {
 // const sortType = value; console.log(value);
  //return sortType != "" ? movie.sort_by.includes(sortType) : true;
//};
// Rating filter function
export const ratingFilter = function (movie: ListedMovie, value: string) {
  const minRating = parseFloat(value);
  return minRating ? movie.vote_average >= minRating : true;
};

export const popularityFilter = function (movie: ListedMovie, value: string) {
  const minpopularity = parseFloat(value);
  return minpopularity ? movie.popularity >= minpopularity : true;
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  popularityFilter: string;
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter,ratingFilter,popularityFilter }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
         // sortFilter={sortFilter}
          ratingFilter={ratingFilter}
          popularityFilter={popularityFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;