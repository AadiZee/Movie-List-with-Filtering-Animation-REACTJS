import "./App.css";
import { useEffect, useState } from "react";
import Movie from "./components/movie/movie";
import Filter from "./components/filter/filter";
import { motion, AnimatePresence } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

const API_KEY = "YOUR_API_KEY_HERE";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    if (popular && popular.length !== 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [popular]);

  const fetchPopular = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <Filter
            popular={popular}
            setFiltered={setFiltered}
            activeGenre={activeGenre}
            setActiveGenre={setActiveGenre}
          />
          <motion.div layout className="popular-movies">
            <AnimatePresence>
              {filtered.map((movie) => {
                return <Movie key={movie.id} movie={movie} />;
              })}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;
