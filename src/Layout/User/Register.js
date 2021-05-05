import React, { useContext, useState } from "react"
import {UserContext} from "./UserContext"
import { Link, useHistory } from "react-router-dom";
import axios from "axios"

import { Form, Input, Button, notification } from 'antd';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 5 },
};


const Register = () =>{
  const history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})

  const handleSubmit = () =>{
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name, 
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push('/')
        notificationSuccess('success')
      }
    ).catch((err)=>{
      notificationFailed('error')
    })
  }

  const handleChange = (event) =>{
    setInput(
      {...input,[event.target.name]:event.target.value}
    )
  }

  const notificationFailed = type => {
    notification[type]({
      message: 'E-mail or username already taken!',
      duration: 4,
    });
  };

  const notificationSuccess = type => {
    notification[type]({
      message: 'Create account success!',
      duration: 4,
    });
  };

  return(
    <>
      <div style={{margin: "0 auto", width: "100%", padding: "50px"}}>
      <Form
      {...layout}
      name="basic"
      onFinish={handleSubmit}
      >

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input name="name" onChange={handleChange} value={input.name}/>
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Please input your e-mail!' }]}
      >
        <Input name="email" onChange={handleChange} value={input.email}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' },
        { min: 6, message: 'Password must be minimum 6 characters.' }]}
        hasFeedback
      >
        <Input.Password name="password" onChange={handleChange} value={input.password}/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button><br /><br />
        <span>Already have an account? <Link to="/login"> Login here</Link>.</span>
      </Form.Item>

    </Form>
      </div>
    </>
  )
}

export default Register