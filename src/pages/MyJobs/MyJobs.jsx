/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useEffect } from "react";
import "./MyJobs.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UpdateJobModal from "../UpdateJobModal/UpdateJobModal";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [control, setControl] = useState(false);

  const handleSearch = () => {
    // console.log(searchText);
    fetch(`http://localhost:5000/getSearchJob/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  };

  const handleJobUpdate = () => {};

  useEffect(() => {
    fetch(`http://localhost:5000/myJob/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user]);

  return (
    <div>
      <div className="my-jobs-container">
        <h1 className="text-center p-4 ">ALL My Jobs</h1>
        <div className="search-box p-2 text-center">
          <input
            type="text"
            className="p-1 form-control w-25 mx-auto mb-2"
            onChange={(e) => setSearchText(e.target.value)}
          />{" "}
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <Table striped bordered hover className="container">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>vacancy</th>
              <th>salary</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.vacancy}</td>
                <td>{job.salary}</td>
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit
                  </Button>
                  <UpdateJobModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    job={job}
                    handleJobUpdate={handleJobUpdate}
                  />
                </td>
                <td>
                  {" "}
                  <Button variant="warning">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyJobs;
