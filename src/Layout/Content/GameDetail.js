import { Tag } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"

const GameDetail = ({ match }) =>  {
  const { params: { gameId } } = match
  const [game, setGame] = useState(null)

  useEffect(() => {
      axios
      .get(`https://backendexample.sanbersy.com/api/data-game/${gameId}`)
      .then(res => {
        let data = res.data;
        setGame(data)
        })
    }, [game, gameId])

  return (
    <>
    {
      game !== null && (
      <>
        {
          <div className="grid-container">
          <div className="left">
            <img className="img-detail" src={game.image_url} alt={game.name} />
          </div>

          <div className="right">
            <h1> {game.name} ({game.release})</h1>
            <p style={{marginBottom:'0.5em'}}><strong>Genre:</strong> {game.genre}</p>
            <p style={{marginBottom:'1em'}}><strong>Platform:</strong> {game.platform}</p>
            {
                game.singlePlayer === 1 && <Tag>Single Player</Tag>
            }
            {
                game.multiplayer === 1 && <Tag>Multi Player</Tag>
            }
          </div>
        </div>}
      </>
      )
    }
    </>
  );
}

export default GameDetail