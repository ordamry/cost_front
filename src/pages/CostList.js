/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { costAllList, costDelete } from "../redux/cost/costActions";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Loader from "../components/Loading";
import DataTable from "react-data-table-component";
import { Edit, ChevronDown, Trash } from "react-feather";

const CostList = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { loading, successDelete, costData } = useSelector(
    (state) => state.cost
  );
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      dispatch(costAllList({ search: searchVal }));
    }
  }, [dispatch, userInfo, successDelete]);
  const basicCostColumns = [
    {
      name: "Category",
      sortable: true,
      filterable: true,
      maxWidth: "135px",
      selector: (row) => row.category?.name,
    },
    {
      name: "User",
      sortable: true,
      filterable: true,
      maxWidth: "135px",
      selector: (row) => row.user_id?.first_name,
    },
    {
      name: "Description",
      sortable: true,
      filterable: true,
      minWidth: "350px",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      sortable: true,
      filterable: true,
      maxWidth: "135px",
      selector: (row) => row.sum,
    },
    {
      name: "Date",
      sortable: true,
      filterable: true,
      maxWidth: "135px",
      selector: (row) => new Date(row.date).toISOString().split("T")[0],
    },
    {
      name: "Actions",
      maxWidth: "50px",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex" style={{ alignItems: "center" }}>
            <Trash
              onClick={() => deleteCost(`${row._id}`)}
              style={{ color: "red" }}
              className="me-2"
              size={15}
            />
            <a href={`costs/${row._id}`}>
              <Edit size={15} />
            </a>
          </div>
        );
      },
    },
  ];

  const deleteCost = (costId) => {
    dispatch(costDelete({ id: costId }));
  };
  const handleSearchChange = (event) => {
    setSearchVal(event.target.value);
  };
  const searchFunc = () => {
    if (searchVal) {
      dispatch(costAllList({ search: searchVal }));
    }
  };
  return (
    <div>
      {!loading ? (
        <div className="my-3 my-md-5">
          <Container>
            <Row className="mb-4">
              <h3>Cost</h3>
            </Row>
            <Row>
              <Col lg={6} xl={6} md={6}>
                <a href="/new-cost" className="btn btn-primary btn-sm">
                  New Cost
                </a>
              </Col>
              <Col lg={6} xl={6} md={6}>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Form className="input-icon my-3 my-lg-0">
                    <div style={{ display: "flex" }}>
                      <Form.Control
                        type="search"
                        className="form-control header-search"
                        placeholder="Search…"
                        onChange={handleSearchChange}
                      ></Form.Control>
                      <div className="input-icon-addon">
                        <i className="fe fe-search"></i>
                      </div>
                      <Button
                        className="btn-sm"
                        type="button"
                        variant="primary"
                        onClick={() => searchFunc()}
                      >
                        Search
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <DataTable
                noHeader
                pagination
                data={costData}
                columns={basicCostColumns}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </Row>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CostList;
