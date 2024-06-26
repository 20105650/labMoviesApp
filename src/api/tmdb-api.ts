export const getMovies = (page: number, sortby: string ="popularity.desc") => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&sort_by=${sortby}&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

  export const getUpcomingMovies = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getTrendingMovies = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getTvShows = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch Tv Shows. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };
  
  export const getMovie = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  export const getTvGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  export const getMovieReviews = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getTvshowReviews = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getTvshowImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getTvshow = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActors = (page: number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch Actors list. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };


  export const getActorImages = (id: string | number) => {  console.log(id);
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };


  export const getActor = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get person data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  export const getKnownfor = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get person movie/TV data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => json.cast)
    .catch((error) => {
      throw error
   });
  };