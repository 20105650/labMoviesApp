import React, { useState } from "react";
import { ListedActor} from "../types/interfaces";

interface ActorContextInterface {
    favourites: number[];
    addToFavourites: ((actor: ListedActor) => void);
    removeFromFavourites: ((actor: ListedActor) => void);
    //addReview: ((tvshow: TvshowT, review: Review) => void);
    
}
const initialContextState = {
    favourites: [],
    addToFavourites: (actor: ListedActor) => {actor.id },
    removeFromFavourites: (actor: ListedActor) => { actor.id},
    //addReview: (actor, review) => { actor.id, review},
    
};


export const ActorsContext = React.createContext<ActorContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  //  const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [favourites, setFavourites] = useState<number[]>([]);
   

    const addToFavourites = (actor: ListedActor) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(actor.id)) {
            updatedFavourites.push(actor.id);
        }
        setFavourites(updatedFavourites);
    };

    // We will use this function in a later section
    const removeFromFavourites = (actor: ListedActor) => {
        setFavourites(favourites.filter((mId) => mId !== actor.id));
    };


    return (
        <ActorsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {props.children}
        </ActorsContext.Provider>
    );
};

export default ActorsContextProvider;