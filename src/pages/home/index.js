import { useEffect, useState } from "react";
import { Container, Movie, MovieList } from "./style";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Constantes
const API_KEY = process.env.REACT_APP_KEY;
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  // State
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // useEffect
  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
  }, []);

  // Função para buscar filmes populares
  const fetchPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setInitialMovies(data.results);
      });
  };

  // Função para buscar gêneros de filmes
  const fetchGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  };

  // Função para buscar filmes por pesquisa
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMovies(initialMovies);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setMovies(data.results);
          document.querySelector(".carousel").style.display = "none";
        } else {
          setMovies([]);
          alert("Nenhum filme encontrado com esse termo de pesquisa.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };

  // Função para renderizar lista de filmes por gênero
  const renderMovieSections = () => {
    return genres.map((genre) => {
      const moviesInGenre = movies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );

      if (moviesInGenre.length > 0) {
        return (
          <div key={genre.id}>
            <h2 style={{ color: "#fff" }}>{genre.name}</h2>
            <MovieList>
              {moviesInGenre.map((movie) => (
                <Movie key={movie.id}>
                  <Link to={`/${movie.id}`}>
                    <img
                      src={`${IMAGE_PATH}${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </Movie>
              ))}
            </MovieList>
          </div>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <Container>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            MovieQuest
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#fff"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active text-white"
                  aria-current="page"
                  href="/"
                >
                  Início
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#categorias"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  {genres.map((genre) => (
                    <li key={genre.id}>
                      <a className="dropdown-item" href={`#${genre.name}`}>
                        {genre.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Busca"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn text-white" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#fff"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="/569094">
              <img
                src={process.env.PUBLIC_URL + "/img/homemaranha.png"}
                className="d-block w-100"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/603692">
              <img
                src={process.env.PUBLIC_URL + "/img/johnwick4.png"}
                className="d-block w-100"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/667538">
              <img
                src={process.env.PUBLIC_URL + "/img/transformers.jpg"}
                className="d-block w-100"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/436270">
              <img
                src={process.env.PUBLIC_URL + "/img/adao-negro.jpg"}
                className="d-block w-100"
              />
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            className="bi bi-caret-left-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12z" />
          </svg>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            className="bi bi-caret-right-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z" />
          </svg>
        </button>
      </div>
      <h2 style={{color: "#fff", marginTop: "20px"}}>Mais vistos</h2>
      <MovieList>
        {movies.map((movie) => {
          if (movie.poster_path) {
            return (
              <Movie key={movie.id}>
                <Link to={`/${movie.id}`}>
                  <img
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </Movie>
            );
          } else {
            return (
              <Movie key={movie.id}>
                <span>{movie.title}</span>
              </Movie>
            );
          }
        })}
      </MovieList>
      {genres.map((genre) => {
        const moviesInGenre = movies.filter((movie) =>
          movie.genre_ids.includes(genre.id)
        );

        if (moviesInGenre.length > 0) {
          return (
            <div id={genre.name} key={genre.id}>
              <h2 style={{ color: "#fff" }}>{genre.name}</h2>
              <MovieList>
                {moviesInGenre.map((movie) => (
                  <Movie key={movie.id}>
                    <Link to={`/${movie.id}`}>
                      <img
                        src={`${imagePath}${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                  </Movie>
                ))}
              </MovieList>
            </div>
          );
        } else {
          return null;
        }
      })}
    </Container>
  );
}

export default Home;
