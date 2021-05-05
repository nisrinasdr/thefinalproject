import React, {useState, createContext, useEffect} from "react"
import axios from "axios"


const GameContext = createContext()

const GameProvider = props => {
    const [daftarGame, setDaftarGame] = useState(null)
    const [input, setInput] = useState({
        genre: '',
        image_url: '',
        name: '',
        platform: '',
        release: '',
        singlePlayer: '',
        multiplayer: '' 
    })

    useEffect( () => {
        if(daftarGame === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let data = res.data;
                setDaftarGame(
                    data.map(el => { return {
                        id: el.id,
                        genre: el.genre,
                        image_url: el.image_url,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer? "true": "false",
                        multiplayer: el.multiplayer? "true" : "false"  }
                    }))
                })
        }
    }, [daftarGame])

    return(
        <GameContext.Provider value={[daftarGame, setDaftarGame, input, setInput]}>
        {props.children}
        </GameContext.Provider>
    )
}

export {GameContext, GameProvider}