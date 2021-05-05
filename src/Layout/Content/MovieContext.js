import React, {useState, createContext, useEffect} from "react"
import axios from "axios"


const MovieContext = createContext()

const MovieProvider = props => {
    const [daftarFilm, setDaftarFilm] = useState(null)
    const [input, setInput] = useState({
        description: '',
        duration: '',
        genre: '',
        image_url: '',
        rating: '',
        review: '',
        title: '',
        year: ''
    })
    const [currentId, setCurrentId] = useState(null)

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

    return(
        <MovieContext.Provider value={[daftarFilm, setDaftarFilm, input, setInput, currentId, setCurrentId]}>
        {props.children}
        </MovieContext.Provider>
    )
}

export {MovieContext, MovieProvider}