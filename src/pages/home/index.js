import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);

  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    // Carregue os filmes populares iniciais quando a página for carregada
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setInitialMovies(data.results);
      });
  }, [KEY]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMovies(initialMovies);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setMovies(data.results);
          document.querySelector('.carousel').style.display = "none";
        } else {
          setMovies([]);
          alert("Nenhum filme encontrado com esse termo de pesquisa.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };

  return (
    <Container>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Navbar
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
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="#">
                  Início
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Ação e aventura
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Comédia
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Terror
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fantasia
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Anime
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Documentário
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Romance
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Suspense e mistétio
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Infantis
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault(); // Evite o recarregamento da página ao enviar o formulário
                handleSearch();
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn text-white border-white" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
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
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={process.env.PUBLIC_URL + "/img/johnwick4.png"} class="d-block w-100"/>
          </div>
          <div class="carousel-item">
            <img src={process.env.PUBLIC_URL + "/img/creed3.png"} class="d-block w-100"/>
          </div>
          <div class="carousel-item">
            <img src={process.env.PUBLIC_URL + "/img/johnwick4.png"} class="d-block w-100"/>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <h1>Movies</h1>
      <MovieList>
        {movies.map((movie) => {
          // Verificando se a URL da imagem está definida antes de renderizar
          if (movie.poster_path) {
            return (
              <Movie key={movie.id}>
                <img
                  src={`${imagePath}${movie.poster_path}`}
                  alt={movie.title}
                />
                <span>{movie.title}</span>

                <Link to={`/${movie.id}`}>
                  <Btn>Detalhes</Btn>
                </Link>
              </Movie>
            );
          } else {
            // Tratando a situação em que a URL da imagem está ausente ou nula
            return (
              <Movie key={movie.id}>
                <span>{movie.title}</span>

                <Link to={`/${movie.id}`}>
                  <Btn>Detalhes</Btn>
                </Link>
              </Movie>
            );
          }
        })}
      </MovieList>
    </Container>
  );
}

export default Home;
