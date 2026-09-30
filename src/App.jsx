import { useEffect, useState } from "react";
import "./index.css";

const API_BASE = "https://movie-backend-1-ldbb.onrender.com/api/movies";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const genres = [
  { id: "all", name: "All" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 878, name: "Sci-Fi" },
  { id: 27, name: "Horror" },
];

function App() {
  // =========================
  // STATE
  // =========================

  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [activeGenre, setActiveGenre] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [homeLoading, setHomeLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH HOME MOVIES
  // =========================

  const fetchHomeMovies = async () => {
    try {
      setHomeLoading(true);

      const requests = [
        fetch(`${API_BASE}/trending`),
        fetch(`${API_BASE}/popular`),
        fetch(`${API_BASE}/upcoming`),
      ];

      const responses = await Promise.allSettled(requests);

      // Trending
      if (
        responses[0].status === "fulfilled" &&
        responses[0].value.ok
      ) {
        const data = await responses[0].value.json();
        setTrendingMovies(data.results || []);
      } else {
        setTrendingMovies([]);
      }

      // Popular
      if (
        responses[1].status === "fulfilled" &&
        responses[1].value.ok
      ) {
        const data = await responses[1].value.json();
        setPopularMovies(data.results || []);
      } else {
        setPopularMovies([]);
      }

      // Upcoming
      if (
        responses[2].status === "fulfilled" &&
        responses[2].value.ok
      ) {
        const data = await responses[2].value.json();
        setUpcomingMovies(data.results || []);
      } else {
        setUpcomingMovies([]);
      }
    } catch (err) {
      console.error("Home movies error:", err);
    } finally {
      setHomeLoading(false);
    }
  };

  // =========================
  // FETCH MOVIES / SEARCH
  // =========================

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      let endpoint;

      if (query.trim()) {
        endpoint = `${API_BASE}/search?query=${encodeURIComponent(
          query
        )}`;
      } else {
        endpoint = `${API_BASE}/popular`;
      }

      const response = await fetch(endpoint);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}));

        throw new Error(
          errorData.error ||
            `Movie request failed (${response.status})`
        );
      }

      const data = await response.json();

      setMovies(data.results || []);
    } catch (err) {
      console.error("Movie API Error:", err);

      setMovies([]);
      setError(err.message || "Unable to load movies.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchHomeMovies();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  // =========================
  // SEARCH WITH DELAY
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // FAVORITES
  // =========================

  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === movie.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...currentFavorites, movie];
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  };

  // =========================
  // GET YEAR
  // =========================

  const getYear = (date) => {
    if (!date) return "N/A";

    return new Date(date).getFullYear();
  };

  // =========================
  // FILTER MOVIES
  // =========================

  const filteredMovies = movies.filter((movie) => {
    const genreMatch =
      activeGenre === "all" ||
      movie.genre_ids?.includes(Number(activeGenre));

    const favoriteMatch =
      !showFavorites ||
      favorites.some(
        (favorite) => favorite.id === movie.id
      );

    return genreMatch && favoriteMatch;
  });

  // =========================
  // MOVIE CARD
  // =========================

  const MovieCard = ({ movie }) => (
    <article className="movie-card">
      <div
        className="poster-wrapper"
        onClick={() => setSelectedMovie(movie)}
      >
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            <span>🎬</span>
            <p>No Poster</p>
          </div>
        )}

        <div className="poster-overlay">
          <span>View Details</span>
        </div>

        <button
          className={`heart ${
            isFavorite(movie.id) ? "liked" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(movie);
          }}
          aria-label="Favorite"
        >
          {isFavorite(movie.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="movie-info">
        <h3 title={movie.title}>
          {movie.title}
        </h3>

        <div className="movie-meta">
          <span>
            ⭐{" "}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span>
            {getYear(movie.release_date)}
          </span>
        </div>
      </div>
    </article>
  );

  // =========================
  // HOME MOVIE SECTION
  // =========================

  const MovieSection = ({
    label,
    title,
    moviesList,
  }) => {
    if (homeLoading) {
      return (
        <section className="movie-category">
          <div className="section-heading">
            <div>
              <p className="section-label">
                {label}
              </p>

              <h2>{title}</h2>
            </div>
          </div>

          <div className="status category-loading">
            <div className="loader"></div>
            <p>Loading movies...</p>
          </div>
        </section>
      );
    }

    if (!moviesList.length) {
      return null;
    }

    return (
      <section className="movie-category">
        <div className="section-heading">
          <div>
            <p className="section-label">
              {label}
            </p>

            <h2>{title}</h2>
          </div>

          <span className="movie-count">
            {moviesList.length} movies
          </span>
        </div>

        <div className="movie-grid category-grid">
          {moviesList
            .slice(0, 10)
            .map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
              />
            ))}
        </div>
      </section>
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          🎬 <span>MovieExplorer</span>
        </div>

        <button
          className={`favorite-btn ${
            showFavorites ? "active" : ""
          }`}
          onClick={() =>
            setShowFavorites(!showFavorites)
          }
        >
          ❤️ Favorites ({favorites.length})
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="hero-tag">
            DISCOVER YOUR NEXT FAVORITE
          </p>

          <h1>
            Explore the world of
            <span> movies</span>
          </h1>

          <p className="hero-description">
            Search thousands of movies, discover new
            favorites and explore what's popular right now.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <span>🔎</span>

            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </section>

      {/* HOME MOVIE SECTIONS */}
      {!search && !showFavorites && (
        <div className="home-sections">

          <MovieSection
            label="TRENDING THIS WEEK"
            title="🔥 Trending Movies"
            moviesList={trendingMovies}
          />

          <MovieSection
            label="POPULAR RIGHT NOW"
            title="⭐ Popular Movies"
            moviesList={popularMovies}
          />

          <MovieSection
            label="COMING SOON"
            title="🚀 Upcoming Movies"
            moviesList={upcomingMovies}
          />

        </div>
      )}

      {/* GENRES */}
      <section className="filters">
        <div className="genre-list">

          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`genre ${
                activeGenre === genre.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveGenre(genre.id)
              }
            >
              {genre.name}
            </button>
          ))}

        </div>
      </section>

      {/* MAIN MOVIES */}
      <main className="movies-section">

        <div className="section-heading">
          <div>

            <p className="section-label">
              {showFavorites
                ? "YOUR COLLECTION"
                : search
                ? "SEARCH"
                : "NOW SHOWING"}
            </p>

            <h2>
              {showFavorites
                ? "Your Favorites"
                : search
                ? `Search results for "${search}"`
                : "Browse Movies"}
            </h2>

          </div>

          <span className="movie-count">
            {filteredMovies.length} movies
          </span>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="status">

            <div className="loader"></div>

            <h3>
              Loading movies...
            </h3>

            <p>
              Fetching movies from TMDB
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="status error">

            <div className="error-icon">
              ⚠️
            </div>

            <h3>
              Unable to load movies
            </h3>

            <p>{error}</p>

            <button
              className="retry-btn"
              onClick={() =>
                fetchMovies(search)
              }
            >
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredMovies.length === 0 && (
            <div className="status">

              <div className="empty-icon">
                🎬
              </div>

              <h3>
                No movies found
              </h3>

              <p>
                {showFavorites
                  ? "You haven't added any favorites yet."
                  : "Try another search or genre."}
              </p>

            </div>
          )}

        {/* MOVIE GRID */}
        {!loading &&
          !error &&
          filteredMovies.length > 0 && (
            <div className="movie-grid">

              {filteredMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                />
              ))}

            </div>
          )}

      </main>

      {/* MOVIE DETAILS MODAL */}
      {selectedMovie && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedMovie(null)
          }
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedMovie(null)
              }
            >
              ✕
            </button>

            {/* MODAL POSTER */}
            <div className="modal-poster">

              {selectedMovie.poster_path ? (
                <img
                  src={`${IMAGE_BASE}${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              ) : (
                <div className="no-poster large">
                  🎬
                </div>
              )}

            </div>

            {/* MODAL CONTENT */}
            <div className="modal-content">

              <p className="modal-label">
                MOVIE DETAILS
              </p>

              <h2>
                {selectedMovie.title}
              </h2>

              <div className="modal-meta">

                <span>
                  ⭐{" "}
                  {selectedMovie.vote_average
                    ? selectedMovie.vote_average.toFixed(1)
                    : "N/A"}
                </span>

                <span>
                  {getYear(
                    selectedMovie.release_date
                  )}
                </span>

                <span>
                  {selectedMovie.adult
                    ? "18+"
                    : "PG"}
                </span>

              </div>

              <p className="overview">
                {selectedMovie.overview ||
                  "No description available for this movie."}
              </p>

              <button
                className="modal-favorite"
                onClick={() =>
                  toggleFavorite(selectedMovie)
                }
              >
                {isFavorite(selectedMovie.id)
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          🎬 MovieExplorer
        </div>

        <p>
          Discover. Watch. Enjoy.
        </p>

        <small>
          This product uses the TMDB API but is not
          endorsed or certified by TMDB.
        </small>

        <small>
          Made by{" "}
          <strong>Abhishek Rawat</strong>
        </small>

      </footer>

    </div>
  );
}

export default App;