import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Rate } from 'antd';
import { Link } from "react-router-dom";
import './List.css'

const { Meta } = Card;

const MovieTop = (props) => {
    const [daftarFilm, setDaftarFilm] = useState(null)

    useEffect( () => {
        if(daftarFilm === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let data = res.data;
                setDaftarFilm(
                    data.map(el => { return {
                        id: el.id,
                        description: el.description,
                        duration: el.duration,
                        genre: el.genre,
                        image_url: el.image_url,
                        rating: el.rating,
                        review: el.review,
                        title: el.title,
                        year: el.year }
                    }))
                })
        }
    }, [daftarFilm])
    
    const topMoviesDisplay = () => {
        const sortByRating = daftarFilm.sort((a, b) => b.rating - a.rating)
        let topMovies = []
        for(let i=0; i<5; i++) {
            topMovies.push(sortByRating[i])
        }
        return(
            <>
            {
            topMovies.map((el, idx) => { return (
                <Link to={`/movie-detail/${el.id}`} >
                <Card
                    hoverable
                    style={{ borderRadius:'1em' }}
                    cover={
                        <img
                            alt={el.title}
                            src={el.image_url}
                            style={{borderTopLeftRadius:'1em', borderTopRightRadius:'1em'}}
                        />
                    }
                >
                
                <Rate disabled value={el.rating/2} style={{fontSize: "1em", marginBottom:'1em'}}/>
                
                <Meta
                    title={el.title} 
                    description={el.description}
                    style={{width:"100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }}
                />
                
            </Card>
            </Link>)
            })
        }
            </>
        )
    }
    
       
  

return(
  <>
  <h1 style={{textAlign: 'center', margin: '1rem'}}>Top Movies</h1>
  {
      daftarFilm !== null && (
          <>
          <div className="container-front-page">
          {topMoviesDisplay()}
          </div>
          </>
      )
  }
  
  </>
)
}
        

export default MovieTop
