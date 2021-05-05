import axios from "axios";
import React, { useEffect, useState } from "react"
import { Rate } from 'antd';

const MovieDetail = ({match}) =>  {
  const { params: { movieId } } = match;
  const [film, setFilm] = useState(null)

  useEffect(() => {
    if(film === null) {
      axios
      .get(`https://backendexample.sanbersy.com/api/data-movie/${movieId}`)
      .then(res => {
          let data = res.data;
          setFilm(data)
          })}
    }, [film, movieId])

  return (
    <>
    {
      film !== null && (
      <>
        {
          <div className="grid-container">
          <div className="left">
            <img className="img-detail" src={film.image_url} alt={film.title} />
            
          </div>

          <div className="right">
            <h1 > {film.title} ({film.year})</h1>
            <div className="rating" style={{marginBottom:'0.5em'}}>
              <Rate disabled value={film.rating/2} style={{display:"inline"}} />
              <p style={{display:"inline"}}>  ({film.rating})</p>
            </div><br/>
            <p style={{marginBottom:'0.5em'}}><strong>Genre:</strong> {film.genre}</p>
            <p style={{marginBottom:'0.5em'}}><strong>Duration:</strong> {Math.floor(film.duration/60)} hour {film.duration%60} minute</p>
            <p style={{marginBottom:'0.5em'}}><strong>Description:</strong> {film.description}</p>
            <h2>Review</h2>
            <p>{film.review}</p>
            

          </div>
        </div>}
      </>
      )
    }
    </>
  );
}

export default MovieDetail