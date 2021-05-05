import React, { useState, useEffect, useContext } from "react"
import { Input, Form, InputNumber, Checkbox, Button, notification } from 'antd';
import axios from "axios"
import { UserContext } from "../User/UserContext";
import { useHistory }from "react-router-dom"

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const GameEdit = ({match}) =>  {
  const { params: { gameEditId } } = match;
  const [input, setInput] = useState(null)
  const [user,] = useContext(UserContext)
  const history = useHistory()
  
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  useEffect(() => {
    if(input === null) {
      axios
      .get(`https://backendexample.sanbersy.com/api/data-game/${gameEditId}`)
      .then(res => {
          let data = res.data;
          setInput(data)
          })}
    }, [input, gameEditId])

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
    
    const handleSubmit = () => {
      axios
      .put(`https://backendexample.sanbersy.com/api/data-game/${gameEditId}`, input, config)
      .then(res => {
        notificationSuccess('success')
        history.push('/game-list-edit')
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
        name="add game"
        layout="horizontal"
        initialValues={input}
        onFinish={ handleSubmit }
      >
        <Form.Item 
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the tittle of the movie." }]}>
          <Input style={{width: '100%'}} name='name' 
          onChange={handleChange}
          />
        </Form.Item>
        <Form.Item 
            label="Platform" 
            name="platform"
            rules={[{ required: true, message: "Please input the platform of the game." }]}>
          <Input onChange={handleChange} name="platfrom"/>
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
        
      )}
    </>);
}

export default GameEdit