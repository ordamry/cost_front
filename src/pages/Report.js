/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useState, useEffect } from 'react'
import "flatpickr/dist/themes/material_green.css";
import { Form, Row, Col, Container, Card } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loading'

const backendApiURL = "http://13.53.201.157/api";

export const Report = () => {
    const [picker, setPicker] = useState(new Date())
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [userId, setUserId] = useState('')
    const [report, setReport] = useState('')
    const [userList, setUserList] = useState('')
    const navigate = useNavigate()
    const { userInfo, userToken, loading } = useSelector((state) => state.user)
    const handleDateRange = (date) => {
        setStart(date[0].getFullYear() + "-" + String(date[0].getMonth() + 1).padStart(2, '0') + "-" + String(date[0].getDate()).padStart(2, '0'))
        setEnd(date[1]?.getFullYear() + "-" + String(date[1]?.getMonth() + 1).padStart(2, '0') + "-" + String(date[1]?.getDate()).padStart(2, '0'))
        setPicker(date)
    }
    const userData = React.useCallback(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        }
        const { data } = await axios.get(
            `${backendApiURL}/users`,
            config
        )
        
        var userSelect = []
        data.forEach((item) => {
            let user = {}
            user.value = item._id
            user.label = item.firstname
            userSelect.push(user)
        })
        setUserList(userSelect)
    }, [userToken])
    const reportData = React.useCallback(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        }
        let requestUrl = `${backendApiURL}/report?userId=${userId}&startDate=${start}&endDate=${end}`
        const { data } = await axios.get(
            `${requestUrl}`,
            config
        )

        setReport(data)
    }, [userId, start, end, userToken]);
    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            userData()
            reportData()
        }
    }, [navigate, userInfo, userId, start, end, reportData, userData])

    return (
        <div>
            { !loading && userList ?
                <div className='my-3 my-md-5'>
                    <Container>
                        <Card><Card.Header>
                            <h3 className="card-title">Report</h3>
                            <Card.Body>
                                <Row>
                                    <Col lg={6} xl={4} md={4}>
                                        <Form.Label>Date Range</Form.Label>
                                        <Flatpickr
                                            value={picker}
                                            id='range-picker'
                                            className='form-control'
                                            onChange={date => handleDateRange(date)}
                                            options={{
                                                mode: 'range',
                                                defaultDate: ['2020-02-01', '2020-02-15']
                                            }}
                                        />
                                    </Col>
                                    <Col lg={6} xl={4} md={4}>
                                        <Form.Label>User</Form.Label>
                                        <select className='form-control' value={userId} onChange={(e) => setUserId(e.target.value)}>
                                            <option value="">Please Select...</option>
                                            {userList.map(user => {
                                                return (<option key={user.value} value={user.value}>{user.label}</option>)
                                            })}
                                        </select>
                                    </Col>
                                </Row>
                                <Row className='mt-4 mb-3'>
                                    <h4>Report Detail</h4>
                                    {JSON.stringify(report)}
                                </Row>
                            </Card.Body>
                        </Card.Header></Card>
                    </Container>
                </div> : <Loader />}
        </div>

    )
}

export default Report