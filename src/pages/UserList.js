/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loading'
import DataTable from 'react-data-table-component'
import { ChevronDown, Trash } from 'react-feather'
import { userDelete, usersList } from '../redux/user/userActions'

const UserList = () => {
    const { userInfo } = useSelector((state) => state.user)
    const { loading, successDelete, usersData } = useSelector((state) => state.user)
    const [searchVal, setSearchVal] = useState("")

    const dispatch = useDispatch()
    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            dispatch(usersList({search: searchVal}))
        }
    }, [dispatch, userInfo, successDelete])

    const deleteUser = (userId) => {
        dispatch(userDelete({ id: userId }))
    }
    const basicUserColumns = [
        {
            name: 'Firstname',
            sortable: true,
            filterable: true,
            minWidth: '135px',
            selector: row => row.firstname
        },
        {
            name: 'Lastname',
            sortable: true,
            filterable: true,
            minWidth: '135px',
            selector: row => row.lastname
        },
        {
            name: 'Email',
            sortable: true,
            filterable: true,
            minWidth: '135px',
            selector: row => row.email
        },
        {
            name: 'BirthDay',
            sortable: true,
            filterable: true,
            minWidth: '135px',
            selector: row => new Date(row.birthday).toISOString().split('T')[0]
        },
        {
            name: 'Actions',
            maxWidth: '50px',
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className='d-flex' style={{ alignItems: "center" }}>
                        <Trash onClick={() => deleteUser(`${row._id}`)} style={{ color: 'red' }} className='me-2' size={15} />
                    </div>
                )
            }
        }
    ]
    const handleSearchChange = (event) => {
        setSearchVal(event.target.value);
      };
    const searchFunc = () => {
        if (searchVal) {
            dispatch(usersList({search: searchVal}))
        }
    }

    return (
        <div>
            {!loading ? <div className='my-3 my-md-5'>
                <Container>
                    <Row className='mb-4'>
                        <h3>Users</h3>
                    </Row>
                    <Row>
                        <Col lg={6} xl={6} md={6}>
                        </Col>
                        <Col lg={6} xl={6} md={6}>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Form className="input-icon my-3 my-lg-0">
                                    <div style={{ display: 'flex' }}>
                                        <Form.Control type="search" className="form-control header-search" placeholder="Search…" onChange={handleSearchChange}></Form.Control>
                                        <div className="input-icon-addon">
                                            <i className="fe fe-search"></i>
                                        </div>
                                        <Button className='btn-sm' type='button' variant='primary' onClick={() => searchFunc()}>
                                            Search
                                        </Button>
                                    </div>

                                </Form>

                            </div>

                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <DataTable
                            noHeader
                            pagination
                            data={usersData}
                            columns={basicUserColumns}
                            className='react-dataTable'
                            sortIcon={<ChevronDown size={10} />}
                            paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        />
                    </Row>

                </Container>

            </div> : <Loader />}
        </div>

    )
}

export default UserList;
