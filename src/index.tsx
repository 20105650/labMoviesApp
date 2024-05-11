import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import TvshowPage from "./pages/tvshowDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import TvShowsPage from "./pages/tvShowsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import ActorsPage from "./pages/actorsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
      <MoviesContextProvider>
      <Routes>
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/trending" element={<TrendingMoviesPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/tvshows" element={<TvShowsPage />} />
        <Route path="/tvshows/:id" element={<TvshowPage />} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)