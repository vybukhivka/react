import { useEffect, useState } from "react";

const key = "3b6ac479"

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
		const controller = new AbortController()

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`, {signal: controller.signal}
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
				setError("");
      } catch (error) {
        console.log(error.message);
				setError(error.message);
      } finally {
      	setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

		// handleCloseMovie()
    fetchMovies();

		return () => controller.abort()
  }, [query]);

	return {movies, error, isLoading}
}
