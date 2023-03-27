/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useState, useEffect } from "react";
import "flatpickr/dist/themes/material_green.css";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const backendApiURL = "http://13.53.201.157/api";

export const Report = () => {
  const [picker, setPicker] = useState(new Date());
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [userId, setUserId] = useState("");
  const [report, setReport] = useState("");
  const [userList, setUserList] = useState("");
  const navigate = useNavigate();
  const { userInfo, userToken, loading } = useSelector((state) => state.user);
  const handleDateRange = (date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setPicker(date);
  };
  const userData = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    const { data } = await axios.get(`${backendApiURL}/users`, config);

    var userSelect = [];
    data.forEach((item) => {
      let user = {};
      user.value = item.id;
      user.label = item.first_name;
      userSelect.push(user);
    });
    setUserList(userSelect);
  }, [userToken]);
  const reportData = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    let requestUrl = `${backendApiURL}/report?userId=${userId}&year=${year}&month=${month}`;
    const { data } = await axios.get(`${requestUrl}`, config);

    setReport(data);
  }, [userId, year, month, userToken]);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      userData();
      reportData();
    }
  }, [navigate, userInfo, userId, year, month, reportData, userData]);

  return (
    <div>
      {!loading && userList ? (
        <div className="my-3 my-md-5">
          <Container>
            <Card>
              <Card.Header>
                <h3 className="card-title">Report</h3>
                <Card.Body>
                  <Row>
                    <Col lg={6} xl={4} md={4}>
                      <Form.Label>Date</Form.Label>
                      {/* <Flatpickr
                        value={picker}
                        id="range-picker"
                        className="form-control"
                        onChange={(date) => handleDateRange(date)}
                        options={{
                          mode: "range",
                          defaultDate: ["2020-02-01", "2020-02-15"],
                        }}
                      /> */}
                      <DatePicker
                        dateFormat="MMMM yyyy"
                        className="form-control"
                        showMonthYearPicker
                        selected={picker}
                        onChange={(date) => handleDateRange(date)}
                      />
                    </Col>
                    <Col lg={6} xl={4} md={4}>
                      <Form.Label>User</Form.Label>
                      <select
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      >
                        <option value="">Please Select...</option>
                        {userList.map((user) => {
                          return (
                            <option key={user.value} value={user.value}>
                              {user.label}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                  </Row>
                  <Row className="mt-4 mb-3">
                    <h4>Report Detail</h4>
                    {JSON.stringify(report)}
                  </Row>
                </Card.Body>
              </Card.Header>
            </Card>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Report;
