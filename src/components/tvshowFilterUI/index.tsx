import React, { useState } from "react";
import FilterCard from "../filterTvshowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedTvshow } from "../../types/interfaces";

export const titleFilter = function (tvshow: ListedTvshow, value: string) {
  return tvshow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (tvshow: ListedTvshow, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? tvshow.genre_ids.includes(genreId) : true;
};
export const ratingFilter = function (tvshow: ListedTvshow, value: string) {
  const minRating = parseFloat(value);
  return minRating ? tvshow.vote_average >= minRating : true;
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

interface TvshowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
}


const TvshowFilterUI: React.FC<TvshowFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter,ratingFilter }) => {
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
          ratingFilter={ratingFilter}
        />
      </Drawer>
    </>
  );
};

export default TvshowFilterUI;