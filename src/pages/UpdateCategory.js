/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useEffect } from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loading'
import { categoryGet, categoryUpdate } from '../redux/category/categoryActions'
import Error from '../components/Error'

const UpdateCategory = () => {
    const { categoryId } = useParams();
    const { userInfo } = useSelector((state) => state.user)
    const { loading, error, category, success } = useSelector((state) => state.category)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (success) navigate("/category")
            if (!category.name) {
                dispatch(categoryGet({ id: categoryId }))
            }
        }
    }, [navigate, userInfo, success, category, categoryId, dispatch])
    const submitForm = (data) => {
        data["id"] = categoryId
        dispatch(categoryUpdate(data))
    }
    return (
        <div>
            { !loading && category.name ?
                <div className='my-3 my-md-5'>
                    <Container>
                        <Form onSubmit={handleSubmit(submitForm)}>
                            <Card>
                                <Card.Header>
                                    <h3 className="card-title">Update Category</h3>
                                </Card.Header>
                                <Card.Body>
                                    {error && <Error variant='danger'>{error}</Error>}
                                    <Row>
                                        <Col lg={3} xl={3} md={3}>
                                            <Form.Group className='py-1' controlId='name'>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    className={`${errors.name ? "is-invalid" : ""}`}
                                                    defaultValue={category?.name}
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
                                                    defaultValue={category?.description}
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
                                        <Button className='btn-sm' type='submit' variant='primary'>
                                            Update
                                        </Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Form>
                    </Container>
                </div> :
                <Loader />
            }
        </div>
    )
}

export default UpdateCategory
