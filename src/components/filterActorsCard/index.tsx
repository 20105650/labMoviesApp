import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getGenres } from "../../api/tmdb-api";

import { FilterOption, GenreData } from "../../types/interfaces";
import { Box, SelectChangeEvent } from "@mui/material";

import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  title: {
    textAlign: "left",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
  },
  select: {
    marginBottom: "20px",
  },
  formControl: {
    margin: 1,
    width: "100%",
    marginBottom: "20px", 
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
    paddingBottom: "2px",
  },
  slider: {
    marginBottom: "20px",
  },
};

interface FilterActorsCardProps {
  onUserInput: (f: FilterOption, s: string) => void; // Add this line
  titleFilter: string;
}

const FilterActorsCard: React.FC<FilterActorsCardProps> = (props) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );
  console.log(data);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  
  const handleChange = (
    e: SelectChangeEvent,
    type: FilterOption,
    value: string
  ) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };



  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <Box display="flex" alignItems="flex-end">
              <FilterAltIcon fontSize="large" sx={{ paddingRight: 1 }} />
              <Box component="span">Filter the movies.</Box>
            </Box>
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={props.titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />

        </CardContent>
      </Card>
    </>
  );
};

export default FilterActorsCard;
