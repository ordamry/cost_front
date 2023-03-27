/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileUpdate } from "../redux/user/userActions";
import Error from "../components/Error";

const Profile = () => {
  const { userInfo, success } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(profileUpdate(data));
  };

  return (
    <div className="my-3 my-md-5">
      <Container>
        <Card>
          <Card.Header>
            <h3 className="card-title">Profile</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(submitForm)}>
              {success && <Error variant="primary">Successfull updated</Error>}
              <Row>
                <Col lg={6} xl={6} md={6}>
                  <Form.Group className="py-1" controlId="first_name">
                    <Form.Label>first_name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userInfo.first_name}
                      className={`${errors.first_name ? "is-invalid" : ""}`}
                      placeholder="Enter first_name"
                      {...register("first_name", { required: true })}
                    ></Form.Control>
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        first_name must be required
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} xl={6} md={6}>
                  <Form.Group className="py-1" controlId="last_name">
                    <Form.Label>last_name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userInfo.last_name}
                      className={`${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter last_name"
                      {...register("last_name", { required: true })}
                    ></Form.Control>
                    {errors.last_name && (
                      <div className="invalid-feedback">
                        last_name must be required
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} xl={6} md={6}>
                  <Form.Group className="py-1" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={userInfo.email}
                      className={`${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter Email"
                      {...register("email", { required: true })}
                    ></Form.Control>
                    {errors.email && (
                      <div className="invalid-feedback">
                        Email must be required
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} xl={6} md={6}>
                  <Form.Group className="py-1" controlId="birthday">
                    <Form.Label>BirthDay</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={new Date(
                        userInfo.birthday
                      ).toLocaleDateString("en-CA")}
                      className={`${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter Birthday"
                      {...register("birthday", { required: true })}
                    ></Form.Control>
                    {errors.birthday && (
                      <div className="invalid-feedback">
                        Birthday must be required
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-4">
                <Button className="btn-sm" type="submit" variant="primary">
                  Update
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
