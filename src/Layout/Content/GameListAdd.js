import React, { useContext } from 'react'
import axios from 'axios';
import './List.css'
import { Input, Form, InputNumber, Button, Checkbox, notification } from 'antd';
import { UserContext } from '../User/UserContext';
import { GameContext } from './GameContext';
import { useHistory } from 'react-router-dom'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const GameListAdd = () => {
  const [, setDaftarGame, input, setInput] = useContext(GameContext)
  const [user,] = useContext(UserContext)
  const history = useHistory()
  
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }

  const [form] = Form.useForm()

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

 const handleCheckbox = e => {
  if(e.target.checked === true) {
    setInput({
      ...input, 
      singlePlayer: 1
    }) 
  } else {
    setInput({
      ...input, 
      singlePlayer: 0
    })
  }
}

const handleCheckboxMulti = e => {
  console.log(e.target.checked)
  if(e.target.checked === true) {
    setInput({
      ...input, 
      multiplayer: 1
    }) 
  } else {
    setInput({
      ...input, 
      multiplayer: 0
    })
  }
}

  const handleSubmit = (event) => {
      axios
      .post(`https://backendexample.sanbersy.com/api/data-game`, input, config)
      .then(res => {  
        let data = res.data;
          setDaftarGame(data)
          notificationSuccess('success')
          history.push('/games')
        })
      .catch((err)=>{
        alert(err) 
    })  
  } 
  
  const notificationSuccess = type => {
    notification[type]({
      message: 'The game was successfully added!',
      duration: 4,
    });
  };
  
  
    
    

return(
  <div >
  
      <h1 style={{textAlign: 'center', margin: '1rem'}}>Add New Movie</h1>

      <Form 
        form = {form}
        {...layout}
        style={{backgroundColor:"white",marginBottom:'1rem', padding:'3em', borderRadius:'1em', boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.1)'}}
        name="add game"
        layout="horizontal"
        initialValues={input}
        onFinish={ handleSubmit }
        
      >
        <Form.Item 
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name of the game." }]}>
          <Input style={{width: '100%'}} name='name' 
          onChange={handleChange}
          />
        </Form.Item>
        <Form.Item 
            label="Platform" 
            name="platform"
            rules={[{ required: true, message: "Please input the platform of the game." }]}>
          <Input onChange={handleChange} name="platform"/>
        </Form.Item>
        <Form.Item 
            label="Release Year" 
            name="release"
            type='number'
            rules={[{ required:true, message: "Please input the release year in the range of 1500 until now.", type:'number', min: 1500 }]}> 
          <InputNumber onChange={handleNumber('release')}/>
        </Form.Item>
        <Form.Item 
            label="Genre" 
            name="genre"
            rules={[{ required: true, message: "Please input the genre of the game." }]}>
          <Input onChange={handleChange} name="genre"/>
        </Form.Item>
        <Form.Item 
          label="Play Mode"
          name ="playmode">
          <Checkbox onChange={handleCheckbox}>Single Player</Checkbox>
          <Checkbox onChange={handleCheckboxMulti}>Multi Player</Checkbox>
          {/* <Checkbox.Group options={options} onChange={handleCheckbox} /> */}
        </Form.Item>
        <Form.Item label="Image URL" 
            name="image_url"
            rules={[{ required: true, message: "Please input the image url of the movie." }]}>
          <Input style={{width: '100%'}}  name='image_url' onChange={handleChange}/>
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
        

export default GameListAdd
