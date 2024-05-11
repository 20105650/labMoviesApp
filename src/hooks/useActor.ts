import { useEffect, useState } from "react";
import { getActor } from '../api/tmdb-api'
import { Actor } from '../types/interfaces'

const useActor = (id: string) => {
    const [actor, setActor] = useState<Actor>();
    useEffect(() => {
        getActor(id).then(actor => {
            setActor(actor);
        });
    }, [id]);
    return [actor, setActor];
};

export default useActor