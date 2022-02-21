import { motion } from "framer-motion";

const Movie = ({ movie }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
    >
      <h2 className="movie-title">{movie.title}</h2>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
      />
    </motion.div>
  );
};

export default Movie;
