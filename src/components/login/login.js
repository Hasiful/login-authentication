import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import app from '../../firebase/firebase';

const Login = () => {
    const navigate = useNavigate()
    const signUpPage = () =>{
        navigate('/signup')
    }

    // user state
    const [user, setUser] = useState({})

    // user email state
    const [userEmail, setUserEmail] = useState('')

    const auth = getAuth(app)

    const handleLogin = (e) =>{
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.password.value

        signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
            let user = result.user
            setUser(user);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    console.log(user);


    // get user email
    const handleEmailBlur = (e) =>{
        let email = e.target.value
        setUserEmail(email)
    }

    console.log(userEmail);

    // handle reset password

    const resetHandler = () =>{
        sendPasswordResetEmail(auth, userEmail)
        .then(() =>{
            alert("please check your Email")
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
            <Row>
                <Col md={5} className='m-auto'>
                    <form onSubmit={handleLogin}>
                        <FormGroup>
                            <FormLabel>email</FormLabel>
                            <FormControl onBlur={handleEmailBlur} name="email" type='email'></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl name='password' type='password'></FormControl>
                        </FormGroup>
                        <Button type='submit' className='mt-3 w-100'>Login</Button>
                    </form>
                    <p onClick={() => signUpPage()}>sign up</p>
                    
                    <Button onClick={resetHandler}> Reset password </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;