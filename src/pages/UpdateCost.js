/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loading'
import { costGet, costUpdate } from '../redux/cost/costActions'
import Error from '../components/Error'

const backendApiURL = process.env.REACT_APP_COST_BACKEND_API;

const UpdateCost = () => {
    const { costId } = useParams();
    const { userInfo, userToken } = useSelector((state) => state.user)
    const { loading, error, costD, success } = useSelector((state) => state.cost)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const [categoryVal, setCategoryVal] = useState('')
    const dispatch = useDispatch()
    const categoryData = React.useCallback(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        }
        const { data } = await axios.get(
            `${backendApiURL}/categories`,
            config
        )

        var categorySelect = []
        data.forEach((item) => {
            let category = {}
            category.value = item._id
            category.label = item.name
            categorySelect.push(category)
        })
        setCategoryList(categorySelect)
        setCategoryVal(costD.category)
    }, [costD, userToken])
    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (success) navigate("/costs")
            categoryData()
            if (!costD.category) {
                dispatch(costGet({ id: costId }))
            }
        }
    }, [navigate, dispatch, userInfo, success, costD, costId, userToken, categoryData])
    const submitForm = (data) => {
        let costData = {
            id: costId,
            category: categoryVal,
            description: data.description,
            price: data.price,
            date: data.date
        }
        dispatch(costUpdate(costData))
    }

    return (
        <div>
            {!loading && costD.category ?
                <div className='my-3 my-md-5'>
                    <Container>
                        <Form onSubmit={handleSubmit(submitForm)}>
                            <Card>
                                <Card.Header>
                                    <h3 className="card-title">Update Cost</h3>
                                </Card.Header>
                                <Card.Body>
                                    {error && <Error variant='danger'>{error}</Error>}
                                    <Row>
                                        <Col lg={6} xl={6} md={6}>
                                            <Form.Group className='py-1' controlId='category'>
                                                <Form.Label>Category</Form.Label>
                                                <select className='form-control' value={categoryVal} onChange={(e) => setCategoryVal(e.target.value)}>
                                                    { categoryList.map(category => {
                                                        return (<option key={category.value} value={category.value}>{category.label}</option>)
                                                    })}
                                                </select>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col lg={6} xl={6} md={6}>
                                            <Form.Group className='py-1' controlId='price'>
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type='number'
                                                    defaultValue={costD?.price}
                                                    className={`${errors.price ? "is-invalid" : ""}`}
                                                    placeholder='Enter Price'
                                                    {...register('price', { required: true })}
                                                >
                                                </Form.Control>
                                                {errors.price && (
                                                    <div className="invalid-feedback">Price must be required</div>
                                                )}

                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} xl={6} md={6}>
                                            <Form.Group className='py-1' controlId='date'>
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type='date'
                                                    defaultValue={new Date(costD?.date).toLocaleDateString('en-CA')}
                                                    className={`${errors.date ? "is-invalid" : ""}`}
                                                    placeholder='Enter Date'
                                                    {...register('date', { required: true })}
                                                >
                                                </Form.Control>
                                                {errors.date && (
                                                    <div className="invalid-feedback">Date must be required</div>
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
                                                    defaultValue={costD?.description}
                                                    className={`${errors.description ? "is-invalid" : ""}`}
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
                </div>
                : <Loader />}
        </div>
    )
}

export default UpdateCost
