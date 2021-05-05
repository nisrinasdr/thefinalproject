import React, { useState, useEffect, useContext } from "react"
import { Input, Form, InputNumber, Rate, Button, Radio, notification } from 'antd';
import axios from "axios"
import { UserContext } from "../User/UserContext";
import { useHistory }from "react-router-dom"
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const MovieEdit = ({match}) =>  {
  const { params: { movieEditId } } = match;
  const [input, setInput] = useState(null)
  const [user,] = useContext(UserContext)
  const history = useHistory()
  
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  
  useEffect(() => {
    if(input === null) {
      axios
      .get(`https://backendexample.sanbersy.com/api/data-movie/${movieEditId}`)
      .then(res => {
          let data = res.data;
          setInput(data)
          })}
    }, [input, movieEditId])

    const genreOptions = [
      'Animation', 'Action', 'Adventure',
      'Comedy', 'Drama', 'Fantasy',
      'Horror', 'Romance', 'Sci-fi', 'Thriller', 'War'];
  
    const handleChange = (event) => {
      console.log(input)
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
    
    const handleSubmit = () => {
      axios
      .put(`https://backendexample.sanbersy.com/api/data-movie/${movieEditId}`, input, config)
      .then(res => {
        notificationSuccess('success')
        history.push('/movie-list-edit')
        })
      .catch((err)=>{
        notificationFailed('error') 
    })  
  } 

    const notificationSuccess = type => {
      notification[type]({
        message: 'The change has been added!',
        duration: 4,
      });
    };

    const notificationFailed = type => {
      notification[type]({
        message: 'Your session is expired, please re-login.',
        duration: 4,
      });
    };
    
  return (
    <>
      {input !== null && (
      <Form 
        {...layout}
        style={{backgroundColor:"white",marginBottom:'1rem', padding:'3em', borderRadius:'1em', boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.1)'}}
        name="add movie"
        layout="horizontal"
        initialValues={input}
        onFinish={ handleSubmit }
      >
        <Form.Item 
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the tittle of the movie." }]}>
          <Input style={{width: '100%'}} name='title' 
          onChange={handleChange}
          />
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
          <Rate 
          name='rating' onChange={handleRate}/>
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
        
      )}
    </>);
}

export default MovieEdit