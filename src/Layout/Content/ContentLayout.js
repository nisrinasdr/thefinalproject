import GameLatest from './GameLatest';
import MovieTop from './MovieTop';
import { Carousel } from 'antd';
import carousel1 from './img/carousel1.jpg'
import carousel2 from './img/carousel2.jpg'
import carousel3 from './img/carousel3.jpg'
import carousel4 from './img/carousel4.jpg'

const ContentLayout = () => {
 

return(
  <>
  <Carousel autoplay>
    <div>
      <div style={{position:'relative'}}>
      <img src={carousel1} alt="" style={{objectFit:'cover', width:'100%', height:'60vh', position:'absolute' }}/></div>
      <h1 style={{position:'absolute', bottom:0, backgroundColor:'rgba(255, 255, 255, 0.5)', padding:'0.2em'}}>Litle Women</h1>
    </div>
    <div>
      <div style={{position:'relative'}}>
      <img src={carousel2} alt="" style={{objectFit:'cover', width:'100%', height:'60vh', position:'absolute' }}/>
      </div>
      <h1 style={{position:'absolute', bottom:0, backgroundColor:'rgba(255, 255, 255, 0.5)', padding:'0.2em'}}>Emma</h1>
    </div>
    <div>
      <div style={{position:'relative'}}>
      <img src={carousel3} alt="" style={{objectFit:'cover', width:'100%', height:'60vh', position:'absolute'}}/>
      </div>
      <h1 style={{position:'absolute', bottom:0, backgroundColor:'rgba(255, 255, 255, 0.5)', padding:'0.2em'}}>Pride and Prejudice</h1>
    </div>
    <div>
      <div style={{position:'relative'}}>
      <img src={carousel4} alt="" style={{objectFit:'cover', width:'100%', height:'60vh'}}/>
      <h1 style={{position:'absolute', bottom:0, backgroundColor:'rgba(255, 255, 255, 0.5)', padding:'0.2em'}}>Anne with an E</h1>
      </div>
    </div>
  </Carousel>
  <MovieTop />
  <GameLatest />
  </> 
  );
}
export default ContentLayout