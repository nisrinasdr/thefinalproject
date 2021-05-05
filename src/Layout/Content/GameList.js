import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Layout, Card, Space, Input } from 'antd';
import './List.css'

const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;


const GameList = () => {
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

    const onSearch = value => { 
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res => {
        let data = res.data;
        setDaftarGame(
            data.filter(el => {
            return el.name.toLowerCase().includes(value.toLowerCase())
            })
        )
        })
    }

return(
  <>
   <Layout className="site-layout-background" >
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <h1 style={{textAlign: 'center', margin: '1rem'}}>Games</h1>

      <Space direction="vertical" align="center" style={{marginBottom:'1.7em', width: '100%'}}>
        <Search placeholder="Search movies" onSearch={onSearch} allowClear enterButton style={{ width: '25vw' }}/>
      </Space>
    {
      daftarGame !== null && (
        <div className="container">
        {
            daftarGame.map((el, idx) => { return (
                <Link to={`game-detail/${el.id}`}>
                <Card
                    hoverable
                    style={{ width: '100%', borderRadius:'1em' }}
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
                    style={{maxWidth:"100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }}
                />
                <p style={{color:'grey', fontWeight:'200', marginTop:'0.2em'}}>  {el.platform}</p>
                
            </Card>
            </Link>)
            })
        }
        </div>)
    }
  </Content>
  </Layout>
  </>
)
}
        

export default GameList
