import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Separator } from 'components/Separator/Separator';
import { MovieList } from 'components/MovieList/MovieList';
import { fetchMovieByName } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { useQuery } from 'components/QueryProvider/QueryProvider';

export const SearchMoviesPage = () => {
  const { query, setQuery } = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (query !== '') {
      const getSearchedMovies = async () => {
        try {
          setError(false);
          setIsLoading(true);
          const data = await fetchMovieByName(query);
          setMovies(data.results);
        } catch (error) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      };

      getSearchedMovies();
    } else {
      setMovies([]);
      setIsLoading(false);
    }
  }, [query]);
  return (
    <article>
      <Searchbar searchHandle={setQuery} query={query} />
      {isLoading ? <Loader /> : error ? error : <MovieList list={movies} />}
      <Separator />
    </article>
  );
};
export default SearchMoviesPage;
