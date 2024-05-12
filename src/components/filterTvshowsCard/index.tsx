import React, { ChangeEvent,useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getTvGenres } from "../../api/tmdb-api";

import { FilterOption, GenreData } from "../../types/interfaces";
import { Box, SelectChangeEvent } from "@mui/material";

import { useQuery } from "react-query";
import Spinner from "../spinner";
import Slider from "@mui/material/Slider";

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

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void; // Add this line
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {
  const [rating, setRating] = useState("0");
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getTvGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
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

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRateChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const newRate =
      typeof newValue === "number" ? newValue.toString() : newValue[0].toString();
    setRating(newRate);
    props.onUserInput("rating", newRate);
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
          <FormControl sx={styles.formControl}>
          <Typography variant="h5" component="h1" sx={styles.title}>
            <InputLabel id="genre-label" sx={{ fontWeight : 600, font:24 }}>SELECT GENRE</InputLabel>
            </Typography>
          
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
            
          </FormControl>

          <Typography id="rating-slider" gutterBottom sx={styles.slider}>
          Rating Filter
        </Typography>
        <Slider
          value={parseFloat(rating)}
          onChange={handleRateChange}
          aria-labelledby="rating-slider"
          step={0.1}
          min={0}
          max={10}
          marks
          valueLabelDisplay="auto"
          sx={{
            color: "blue",
          }}
          />

        
        </CardContent>
      </Card>
      
    </>
  );
};

export default FilterMoviesCard;
