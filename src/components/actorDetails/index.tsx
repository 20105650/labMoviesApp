import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
//import { MovieT } from "../../types/interfaces";
//import NavigationIcon from "@mui/icons-material/Navigation";
//import Fab from "@mui/material/Fab";
//import Drawer from "@mui/material/Drawer";
import { Actor } from "../../types/interfaces";
import { useQuery } from "react-query";
import { getKnownfor } from "../../api/tmdb-api";
import Spinner from "../spinner";
import img from '../../images/film-poster-placeholder.png';
import CardMedia from "@mui/material/CardMedia";

interface KnownForItem {
  id: number;
  poster_path: string;
  title: string;
}

const ActorDetails: React.FC<Actor> = (props) => {
  const actor = props;

  const styles = {
    // Define your styles here
    typography: {
      color: "Black",
      fontStyle: "bold",
      margin: 2,
    },
    griditm: {
      Padding: 0,
    },
    griditmout: {
      margin: 1,
    },
    bio: {
      textAlign: "left",
      fontStyle: "bold",
      color: "black",
    },
    gridListTile: {
      width: 200,
      height: '30vh',
      overflow: "hidden",
    },
    imageContainer: {
      overflow: "hidden", // Hide the scrollbar
    },
    media: { height: 300 },
  };

  const {
    data: actedlist,
    error,
    isLoading,
    isError,
  } = useQuery<KnownForItem[], Error>(["knownfor", actor.id], () =>
    getKnownfor(actor.id)
  );
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // const actedlist = data;
  //console.log(data);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Stack spacing={2}>
        <Item>
          <div className="details-grid">
            <Typography variant="h5" component="h3" sx={styles.typography}>
              {" "}
              Personal Information{" "}
            </Typography>

            <Grid
              container
              spacing={2}
              className="details-container"
              sx={styles.griditmout}
            >
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        textTransform: "uppercase",
                        color: "Black",
                        fontWeight: 600,
                      }}
                    >
                      {actor.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={styles.griditm}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      Birthday:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        textTransform: "uppercase",
                        color: "Black",
                        fontWeight: 600,
                      }}
                    >
                      {actor.birthday}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={styles.griditm}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      Gender:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        textTransform: "uppercase",
                        color: "Black",
                        fontWeight: 600,
                      }}
                    >
                      {actor.gender === 1 ? "Female" : "Male"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={styles.griditm}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      Place of Birth:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        textTransform: "uppercase",
                        color: "Black",
                        fontWeight: 600,
                      }}
                    >
                      {actor.place_of_birth}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={styles.griditm}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      Known For:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        color: "black",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {actor.known_for_department}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={styles.griditm}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "Black",
                      }}
                    >
                      imdb_id:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={styles.griditm}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "left",
                        textTransform: "uppercase",
                        color: "Black",
                        fontWeight: 600,
                      }}
                    >
                      {actor.imdb_id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Item>
        <Item sx={styles.bio}>
          BIOGRAPHY:{" "}
          <span style={{ color: "Black", fontWeight: 400 }}>
            {actor.biography}
          </span>
        </Item>
      </Stack>
      <Box component="section" style={{margin:5}}>
        <Grid item>
          <Item> <h2 style={{ color: "Black", fontWeight: 700 }}> KNOWN FOR</h2>
            {actedlist && (
              <ImageList cols={5}>
                {actedlist.slice(0, 4).map((image: KnownForItem) => (
                  <ImageListItem
                    key={image.poster_path}
                    sx={styles.gridListTile}
                    cols={1}
                  >
                   <Link to={`/movies/${image.id}`}> 
                   <CardMedia
                    sx={styles.media}
                    image={
                        image.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${image.poster_path}`
                        : img
                    }
                    />
                   
                   <p>{image.title}</p>
                   </Link>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Item>
        </Grid>
      </Box>
    </>
  );
};
export default ActorDetails;
