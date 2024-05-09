import React, { useState } from "react";
import { ListedMovie, MovieT,  Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    addReview: ((movie: MovieT, review: Review) => void);
    addToPlayList: ((movie: ListedMovie) => void);
}
const initialContextState = {
    favourites: [],
    addToFavourites: (movie: ListedMovie) => {movie.id },
    removeFromFavourites: (movie: ListedMovie) => { movie.id},
    addReview: (movie, review) => { movie.id, review},
    addToPlayList: (movie: ListedMovie) => {movie.id },
};


export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<number[]>([]);

    const addToFavourites = (movie: ListedMovie) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(movie.id)) {
            updatedFavourites.push(movie.id);
        }
        setFavourites(updatedFavourites);
    };

    const addToPlayList =  (movie: ListedMovie) => {
        let updatedPlaylists = [...playlists];
        if (!playlists.includes(movie.id)) {
            updatedPlaylists.push(movie.id);
        }
        setPlaylists(updatedPlaylists);  console.log(updatedPlaylists);
    };



    // We will use this function in a later section
    const removeFromFavourites = (movie: ListedMovie) => {
        setFavourites(favourites.filter((mId) => mId !== movie.id));
    };

    const addReview = (movie: MovieT, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToPlayList,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;