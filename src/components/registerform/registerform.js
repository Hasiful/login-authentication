import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase';

const RegisterForm = () => {


    const auth = getAuth(app)

    const [success, setSuccess] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        setSuccess(false)
        const form = e.target
        const email = e.target.email.value
        const name = e.target.name.value
        const password = e.target.password.value

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError("At least Two Uppercase Word Provide")
            return
        }

        if(password.length < 6){
            setPasswordError("Minimum 6 Characters Password")
        }

        if (!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError("At least One Special Character Provide")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            setSuccess(true);
            form.reset();
            console.log(user);
            setPasswordError("")
            verifyEmail()
            updateData(name)
        })

        .catch(error => {
            console.log('error', error);
            setPasswordError(error.message)
        })
    }

    // verify email
    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            alert("Please Check Email Address")
        })
    }

    // update user data
    const updateData = (name) =>{
        updateProfile(auth.currentUser, {
            displayName: name
        })
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col md='4' className='m-auto'>
                        <Form onSubmit={submitHandler}>
                            <h2 className='text-info'>Register Form</h2>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl name='name' type='name' required></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormControl name='email' type='email' required></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl name='password' type='password'></FormControl>
                            </FormGroup>
                            <p>{passwordError}</p>
                            {
                                success && <p>Successfully User Create</p>
                            }
                            <Button type='submit' className='mt-3' variant='info text-white'>Register</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterForm;