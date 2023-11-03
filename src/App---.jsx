import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { QueryProvider } from './QueryProvider/QueryProvider';
import { Loader } from './Loader/Loader';

const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout'));
const MainPage = lazy(() => import('./../pages/MainPage'));
const CreditsPage = lazy(() => import('./../pages/CreditsPage'));
const SearchMoviesPage = lazy(() => import('./../pages/SearchMoviesPage'));
const MovieInfo = lazy(() => import('./MovieInfo/MovieInfo'));
const NotFoundPage = lazy(() => import('./../pages/NotFoundPage'));
const CastList = lazy(() => import('./CastList/CastList'));
const ArticleList = lazy(() => import('./ArticleList/ArticleList'));

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    const scroll = () => {
      const idToScrollTo =
        location.pathname.substring(location.pathname.lastIndexOf('/') + 1) ||
        'home';
      const scrollTo =
        location.state && idToScrollTo !== `${Number(idToScrollTo)}`
          ? document.querySelector(`#${idToScrollTo}`)
          : undefined;

      if (scrollTo) {
        scrollTo.scrollIntoView();
      }
    };

    setTimeout(scroll, 300);
    // window.scrollTo(0, scrollTo);
  }, [location]);

  useEffect(() => {
    document.title = 'Movie Finder';
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;
    const ctx = canvas.getContext('2d');
    // ctx.fillStyle = '#99ccff';
    ctx.font = '64px serif';
    ctx.fillText('🎬', -10, 53);

    const link = document.createElement('link');
    const oldLinks = document.querySelectorAll('link[rel="icon"]');
    oldLinks.forEach(e => e.parentNode.removeChild(e));
    link.id = 'movie-favicon';
    link.rel = 'icon';
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
  }, []);
  return (
    <>
      <ThemeProvider>
        <QueryProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<MainPage />} />
                <Route path="goit-react-hw-05-movies" element={<MainPage />} />
                <Route path="credits" element={<CreditsPage />} />
                <Route path="movies" element={<SearchMoviesPage />}></Route>
                <Route path="movies/:movieId" element={<MovieInfo />}>
                  <Route path="cast" element={<CastList />} />
                  <Route path="reviews" element={<ArticleList />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </QueryProvider>
      </ThemeProvider>
    </>
  );
};
