/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useEffect } from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoryCreate } from '../redux/category/categoryActions'

const CreateCategory = () => {
    const { userInfo } = useSelector((state) => state.user)
    const { success } = useSelector((state) => state.category)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(!userInfo) {
            navigate("/login")
        } else {
            if (success) navigate("/category")
        }
    }, [navigate, userInfo, success])
    const submitForm = (data) => {
        dispatch(categoryCreate(data))
    }

    return (
        <div className='my-3 my-md-5'>
            <Container>
                <Form onSubmit={handleSubmit(submitForm)}>
                    <Card>
                        <Card.Body>
                            <h3 className="card-title">New Category</h3>
                            <Row>
                                <Col lg={3} xl={3} md={3}>
                                    <Form.Group className='py-1' controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            className={`${errors.name ? "is-invalid" : ""}`}
                                            placeholder='Enter Name'
                                            {...register('name', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.name && (
                                            <div className="invalid-feedback">Name must be required</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} xl={12} md={12}>
                                    <Form.Group className='py-1' controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows={3}
                                            className={`${errors.name ? "is-invalid" : ""}`}
                                            placeholder='Please write here...'
                                            {...register('description', { required: true })}
                                        >
                                        </Form.Control>
                                        {errors.description && (
                                            <div className="invalid-feedback">Description must be required</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='mt-4'>
                                <Button type='submit' variant='primary'>
                                    Create
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                </Form>
            </Container>
        </div>
    )
}

export default CreateCategory
