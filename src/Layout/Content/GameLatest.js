import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card;

const GameLatest = () => {
    const [daftarGame, setDaftarGame] = useState(null)

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
                        created_at: el.created_at
                    }
                    }))
                })
        }
    }, [daftarGame])
    
    const latestGamesDisplay = () => {
        
        const sortByRating = daftarGame.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        let latestGames = []
        for(let i=0; i<5; i++) {
            latestGames.push(sortByRating[i])
        }
        return(
            <>
              {
            latestGames.map((el, idx) => { return (
                <Link to={`/game-detail/${el.id}`} >
                <Card
                    hoverable
                    style={{ borderRadius:'1em' }}
                    cover={
                        <img
                            alt={el.name}
                            src={el.image_url}
                            style={{borderTopLeftRadius:'1em', borderTopRightRadius:'1em'}}
                        />
                    }
                >
                
                <Meta
                    title={el.name} 
                    description={el.genre}
                    style={{width:"100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }}
                />
                <p style={{color:'grey', fontWeight:'200', marginTop:'0.2em', width:"100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap'}}>  {el.platform}</p>
            </Card>
            </Link>)
            })
        }
            </>
        )
    }
    
       
  

return(
  <>
  <h1 style={{textAlign: 'center', margin: '1rem'}}>Latest Games</h1>
  {
      daftarGame !== null && (
          <>
          <div className="container-front-page">
          {latestGamesDisplay()}
          </div>
          </>
      )
  }
  
  </>
)
}
        

export default GameLatest
