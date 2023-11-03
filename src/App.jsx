import { Suspense } from "react";
import "./App.css";
import { Loader } from "./components/Loader/Loader";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { PRollsPage } from "./pages/PRollsPage";
import { Route, Routes } from "react-router";
// import "./js/piano";
/* <img src={logo} className="App-logo" alt="logo" /> */

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PRollsPage />} />
          <Route path="piano" element={<PRollsPage />} />
          {/* <Route path="credits" element={<CreditsPage />} />
          <Route path="movies" element={<SearchMoviesPage />}></Route>
          <Route path="movies/:movieId" element={<MovieInfo />}>
            <Route path="cast" element={<CastList />} />
            <Route path="reviews" element={<ArticleList />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
