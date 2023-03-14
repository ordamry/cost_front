/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { userLogin } from '../redux/user/userActions'

const Login = () => {
    const { loading, userInfo, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate('/costs')
        }
    }, [navigate, userInfo])

    const submitForm = (data) => {
        dispatch(userLogin(data))
    }

    return (
        <Container className='py-3 my-3'>
            <Row className="justify-content-center page-content">
                <Col lg={6} xl={5} md={8}>
                    <Card className='overflow-hidden'>
                        <Card.Body>
                            <div className='p-3'>
                                <h2 className="text-muted text-center">Sign In</h2>
                                <Form onSubmit={handleSubmit(submitForm)}>
                                    {error && <Error variant='danger'>{error}</Error>}
                                    <Form.Group className='py-1' controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            className={`${errors.email ? "is-invalid" : ""}`}
                                            placeholder='Enter Email'
                                            {...register('email', { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
                                        >
                                        </Form.Control>
                                        {errors.email && (
                                            <div className="invalid-feedback">Email must be required</div>
                                        )}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <p className="errorMsg">Email is not valid.</p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='py-1 mb-3' controlId='password'>
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
                                    <Button className='w-100' type='submit' variant='primary'>
                                        {loading && <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />}<span className="ms-3">Sign In</span>
                                    </Button>
                                </Form>
                                <Row className='py-2'>
                                    <p className="my-1">
                                        Don't have an account? <Link to="/register">Sign Up</Link>
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

export default Login