import React, { useContext } from 'react'
import axios from 'axios';
import './List.css'
import { MovieContext } from './MovieContext';
import { Input, Form, InputNumber, Rate, Button, Radio, notification } from 'antd';
import { UserContext } from '../User/UserContext';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const MovieListAdd = () => {
  const [, setDaftarFilm, input, setInput, ,] = useContext(MovieContext)
  const [user,] = useContext(UserContext)
  
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }

  const [form] = Form.useForm()

  const genreOptions = [
    'Animation', 'Action', 'Adventure',
    'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Romance', 'Sci-fi', 'Thriller', 'War'];

  const handleChange = (event) => {
    setInput({
      ...input, [event.target.name]: event.target.value
    })
  }
  const handleNumber  = name => value => {
    setInput({
      ...input, [name]: value
    })
 };
  const handleRate = (value) => {
    let newValue = value * 2
    setInput({
      ...input, rating: newValue
    })
  }

  const handleSubmit = (event) => {
      axios
      .post(`https://backendexample.sanbersy.com/api/data-movie`, input, config)
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
          notificationSuccess('success')
          form.resetFields()
        })
      .catch((err)=>{
        alert(err) 
    })  
  } 
  
  const notificationSuccess = type => {
    notification[type]({
      message: 'The film was successfully added!',
      duration: 4,
    });
  };
  
  
    
    

return(
  <div >
  
      <h1 style={{textAlign: 'center', margin: '1rem'}}>Add New Movie</h1>

      <Form {...layout}
       form={form}
        style={{backgroundColor:"white",marginBottom:'1rem', padding:'3em', borderRadius:'1em', boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.1)'}}
        name="add movie"
        layout="horizontal"
        initialValues={null}
        onFinish={ handleSubmit }
      >
        <Form.Item 
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the tittle of the movie." }]}>
          <Input style={{width: '100%'}} name='title' onChange={handleChange}/>
        </Form.Item>
        <Form.Item 
            label="Release Year" 
            name="year"
            type='number'
            rules={[{ required:true, message: "Please input the release year of the movie in the range of 1500 until now.", type:'number', min: 1500 }]}> 
          <InputNumber onChange={handleNumber('year')}/>
        </Form.Item>
        <Form.Item 
            label="Duration (in minutes)" 
            name="duration"
            rules={[{ required: true, message: "Please input the duration of the movie with positive number.", type: 'number', min: 0 }]}>
          <InputNumber onChange={handleNumber('duration')}/>
        </Form.Item>
        <Form.Item 
            label="Genre" 
            name="genre" 
            rules={[{ required: true, message: "Please select the genre of the movie." }]}>
          <Radio.Group options={genreOptions} name="genre" onChange={handleChange} />
        </Form.Item>
        <Form.Item
            label="Rating" 
            name="rating"
            rules={[{ required: true, message: "Please add the rating of the movie." }]}>
          <Rate value={input.rating} name='rating' onChange={handleRate}/>
        </Form.Item>
        <Form.Item label="Image URL" 
            name="image_url"
            rules={[{ required: true, message: "Please input the image url of the movie." }]}>
          <Input style={{width: '100%'}}  name='image_url' onChange={handleChange}/>
        </Form.Item>
        <Form.Item
            label="Deskripsi" 
            name="description"
            rules={[{ required: true, message: "Please input the description of the movie." }]}>
          <TextArea
             name='description'
            onChange={handleChange}
            autoSize={{ minRows: 3, maxRows: 4 }} />
        </Form.Item>
        <Form.Item 
            label="Review" 
            name="review"
            rules={[{ required: true, message: "Please input the review of the movie." }]}>
          <TextArea
            name='review'
            onChange={handleChange}
            autoSize={{ minRows: 3, maxRows: 4 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        
      </Form>

      
  </div>
)
}
        

export default MovieListAdd
