import React from 'react'
import { useState ,useEffect } from 'react'
import { Form, Input, message } from 'antd'
import LoadingSpenner from '../Components/LoadingSpenner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../Components/NavBar";
import Footer from '../Components/Footer'


const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    const submitHandler = async (values) => {
        console.log(values)
        try {
            setLoading(true)
            const data  = await axios.post('api/v1/users/login', values)
            console.log(data)
            setLoading(false)
            message.success("Login Successful")

            localStorage.setItem('user', JSON.stringify({ ...data.user }))
            Navigate('/')
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error("Something waiting Worng");

        }
    }
     // prevent for login user
    useEffect(()=>{
        if(localStorage.getItem("user")){
          Navigate("/")
        }
      },[Navigate])

    return (
        <>
        <NavBar />
            <div className='register-page'>
                <Form layout='vertical' onFinish={submitHandler} className="card p-5">
                    <h1>Login Form </h1>
                    {loading && <LoadingSpenner />}
                    <Form.Item label="Email" name="email">
                        <Input type='email'  />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary'>Login</button>
                        <Link to='/register'>Not a user ? Please click Here to Register</Link>
                    </div>
                </Form>
            </div>
            <Footer/>
        </>
    )
}

export default LoginPage