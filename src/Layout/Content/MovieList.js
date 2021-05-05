import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout, Card, Rate, Input, Space } from 'antd'
import { Link } from "react-router-dom";
import './List.css'

const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;



const MovieList = () => {
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
    
    const onSearch = value => { 
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res => {
        let data = res.data;
        setDaftarFilm(
            data.filter(el => {
            return el.title.toLowerCase().includes(value.toLowerCase())
            })
        )
        })
    }
       
  

return(
  <Layout className="site-layout-background" >
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <h1 style={{textAlign: 'center', margin: '1rem'}}>Movies</h1>

      <Space direction="vertical" align="center" style={{marginBottom:'1.7em', width: '100%'}}>
        <Search placeholder="Search movies" onSearch={onSearch} allowClear enterButton style={{ width: '25vw' }}/>
      </Space>
      
    {
      daftarFilm !== null && (
        <div className="container" > 
        {
            daftarFilm.map((el, idx) => { return (
                <Link to={`/movie-detail/${el.id}`} >
                <Card
                    hoverable
                    style={{ width: '100%', borderRadius:'1em' }}
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
                    style={{maxWidth:"100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }}
                />
                
            </Card>
            </Link>)
            })
        }
        </div>)
    }
   
  </Content>   
 </Layout>
 )
}
        

export default MovieList
