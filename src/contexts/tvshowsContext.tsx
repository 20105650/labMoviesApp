import React, { useState } from "react";
import { ListedTvshow, TvshowT,  Review } from "../types/interfaces";

interface TvshowContextInterface {
    favourites: number[];
    addToFavourites: ((tvshow: ListedTvshow) => void);
    removeFromFavourites: ((tvshow: ListedTvshow) => void);
    addReview: ((tvshow: TvshowT, review: Review) => void);
    addToPlayList: ((tvshow: ListedTvshow) => void);
}
const initialContextState = {
    favourites: [],
    addToFavourites: (tvshow: ListedTvshow) => {tvshow.id },
    removeFromFavourites: (tvshow: ListedTvshow) => { tvshow.id},
    addReview: (tvshow, review) => { tvshow.id, review},
    addToPlayList: (tvshow: ListedTvshow) => {tvshow.id },
};


export const TvShowsContext = React.createContext<TvshowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<number[]>([]);

    const addToFavourites = (tvshow: ListedTvshow) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(tvshow.id)) {
            updatedFavourites.push(tvshow.id);
        }
        setFavourites(updatedFavourites);
    };

    const addToPlayList =  (tvshow: ListedTvshow) => {
        let updatedPlaylists = [...playlists];
        if (!playlists.includes(tvshow.id)) {
            updatedPlaylists.push(tvshow.id);
        }
        setPlaylists(updatedPlaylists);  console.log(updatedPlaylists);
    };



    // We will use this function in a later section
    const removeFromFavourites = (tvshow: ListedTvshow) => {
        setFavourites(favourites.filter((mId) => mId !== tvshow.id));
    };

    const addReview = (tvshow: TvshowT, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [tvshow.id]: review } )
      };

    return (
        <TvShowsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToPlayList,
            }}
        >
            {props.children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;