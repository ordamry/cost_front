/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import Error from '../components/Error'
import { registerUser } from '../redux/user/userActions'
import Spinner from 'react-bootstrap/Spinner';
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
    const [customError, setCustomError] = useState(null)

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.user
    )

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/profile')
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
        console.log(data,"sdfsd")
        // check if passwords match
        if (data.password !== data.confirmpassword) {
            setCustomError('Password mismatch')
            return
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase()

        dispatch(registerUser(data))
    }

    return (
        <Container className='py-3 my-3'>
            <Row className="justify-content-center page-content">
                <Col lg={6} xl={5} md={8}>
                    <Card className='overflow-hidden'>
                        <Card.Body>
                            <div className='p-3'>
                                <h2 className="text-dark text-center">Sign Up</h2>
                                <Form onSubmit={handleSubmit(submitForm)}>
                                    {error && <Error variant='danger'>{error}</Error>}
                                    {customError && <Error variant='danger'>{customError}</Error>}
                                    <Form.Group className='py-1' controlId='firstname'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            className={`${errors.firstname ? "is-invalid" : ""}`}
                                            placeholder='Enter First Name'
                                            {...register('firstname', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.firstname && (
                                            <div className="invalid-feedback">Firstname must be required</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='py-1' controlId='lastname'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            className={`${errors.lastname ? "is-invalid" : ""}`}
                                            placeholder='Enter Last Name'
                                            {...register('lastname', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.lastname && (
                                            <div className="invalid-feedback">Lastname must be required</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='py-1' controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            className={`${errors.email ? "is-invalid" : ""}`}
                                            placeholder='Enter Email'
                                            {...register('email', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.email && (
                                            <div className="invalid-feedback">Email must be required</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='py-1' controlId='birthday'>
                                        <Form.Label>BirthDay</Form.Label>
                                        <Form.Control
                                            type='date'
                                            className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
                                            placeholder='Enter BirthDay'
                                            {...register('birthday', { required: true })}
                                        >
                                        
                                        </Form.Control>
                                        {errors.birthday && (
                                            <div className="invalid-feedback">BirthDay must be required</div>
                                        )}
                                        
                                    </Form.Group>
                                    <Form.Group className='py-1' controlId='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            className={`${errors.password ? "is-invalid" : ""}`}
                                            placeholder='Enter Password'
                                            {...register('password', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.password && (
                                            <div className="invalid-feedback">Password must be required</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='py-1 mb-3' controlId='passwordConfirm'>
                                        <Form.Label>Confrim Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            className={`${errors.confirmpassword ? "is-invalid" : ""}`}
                                            placeholder='Enter Confirm Password'
                                            {...register('confirmpassword', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.confirmpassword && (
                                            <div className="invalid-feedback">Confirm Password must be required</div>
                                        )}
                                    </Form.Group>
                                    <Button className='w-100' type='submit' variant='danger'>
                                        {loading && <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />}<span className="ms-3">Sign Up</span>
                                    </Button>
                                </Form>
                                <Row className='py-2'>
                                    <p className="my-1">
                                        Already have an account? <Link to="/login">Sign In</Link>
                                    </p>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )

}

export default Register