/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Loader from "../components/Loading";
import { costCreate } from "../redux/cost/costActions";

const backendApiURL = "http://13.53.201.157/api";

const AddCost = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const { loading, success } = useSelector((state) => state.cost);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const dispatch = useDispatch();
  const categoryData = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    const { data } = await axios.get(`${backendApiURL}/categories`, config);

    var categorySelect = [];
    data.forEach((item) => {
      let category = {};
      category.value = item._id;
      category.label = item.name;
      categorySelect.push(category);
    });
    setCategoryList(categorySelect);
  }, [userToken]);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (success) navigate("/costs");
      categoryData();
    }
  }, [navigate, userInfo, success, userToken, categoryData]);
  const submitForm = (data) => {
    let costData = {
      category: data.category.value,
      description: data.description,
      sum: data.sum,
      date: data.date,
    };
    dispatch(costCreate(costData));
  };

  return (
    <div>
      {!loading ? (
        <div className="my-3 my-md-5">
          <Container>
            <Form onSubmit={handleSubmit(submitForm)}>
              <Card>
                <Card.Body>
                  <h3 className="card-title">New Cost</h3>
                  <Row>
                    <Col lg={6} xl={6} md={6}>
                      <Form.Group className="py-1" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Controller
                          name="category"
                          control={control}
                          render={({ field }) => (
                            <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              className={`react-dropdown ${
                                errors.category ? "is-invalid" : ""
                              }`}
                              classNamePrefix="dropdown"
                              options={categoryList}
                              required
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} xl={6} md={6}>
                      <Form.Group className="py-1" controlId="sum">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          className={`${errors.sum ? "is-invalid" : ""}`}
                          placeholder="Enter Price"
                          {...register("sum", { required: true })}
                        ></Form.Control>
                        {errors.sum && (
                          <div className="invalid-feedback">
                            Price must be required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={6} md={6}>
                      <Form.Group className="py-1" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          className={`${errors.date ? "is-invalid" : ""}`}
                          placeholder="Enter Date"
                          {...register("date", { required: true })}
                        ></Form.Control>
                        {errors.date && (
                          <div className="invalid-feedback">
                            Date must be required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} xl={12} md={12}>
                      <Form.Group className="py-1" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className={`${
                            errors.description ? "is-invalid" : ""
                          }`}
                          placeholder="Please write here..."
                          {...register("description", { required: true })}
                        ></Form.Control>
                        {errors.description && (
                          <div className="invalid-feedback">
                            Description must be required
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Button type="submit" variant="primary">
                      Create
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Form>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AddCost;
