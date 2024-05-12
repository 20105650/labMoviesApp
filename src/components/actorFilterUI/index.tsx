import React, { useState } from "react";
import FilterCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedActor } from "../../types/interfaces";

export const titleFilter = function (actor: ListedActor, value: string) {
  return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
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

interface ActorFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
}


const ActorFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, titleFilter }) => {
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
        />
      </Drawer>
    </>
  );
};

export default ActorFilterUI;