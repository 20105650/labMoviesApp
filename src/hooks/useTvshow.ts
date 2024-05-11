import { useEffect, useState } from "react";
import { getTvshow } from '../api/tmdb-api'
import { TvshowT } from '../types/interfaces'

const useTvshow = (id: string) => {
    const [tvshow, setTvshow] = useState<TvshowT>();
    useEffect(() => {
        getTvshow(id).then(tvshow => {
            setTvshow(tvshow);
        });
    }, [id]);
    return [tvshow, setTvshow];
};

export default useTvshow