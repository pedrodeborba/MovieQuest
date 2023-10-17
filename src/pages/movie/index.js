import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ContainerMovie } from "./style";
import "./styles.css";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState(null);

  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id, KEY]);

  if (!movie) {
    // Verificando se o filme está definido antes de acessar suas propriedades
    return <div id="loading">Carregando...</div>;
  }

  return (
    <ContainerMovie>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center align-items-center" style={{ padding: "20px" }}>
            <img
              className="img_movie"
              src={`${imagePath}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="col-lg-6 text-center" style={{paddingTop: 50}}>
            <h1>{movie.title}</h1>
            <h3>Data de lançamento: {movie.release_date}</h3>
            <h3>Classificação: {movie.vote_average}/10</h3>
            <h3>
              Gêneros: {movie.genres.map((genre) => genre.name).join(", ")}
            </h3>
            <h4>Descrição: </h4>
            <div className="descricao">
              <p className="movie-desc">{movie.overview}</p>
            </div>
            <Link to="/">
              <button className="link_button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ContainerMovie>
  );
};

export default Movie;
