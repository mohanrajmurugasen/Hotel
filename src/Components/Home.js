import React, { useState } from "react";
import Booking from "../assets/img/booking.jpg";
import "../assets/css/home.css";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import axios from "axios";

export default function Home() {
  const height = window.innerHeight;
  const difHeight = height / 2 - 369.594 / 2;
  const [modalShow, setModalShow] = useState(false);
  const [bookTable, setbookTable] = useState(null);
  const [count, setcount] = useState(1);
  const [time, settime] = useState(null);
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [people, setpeople] = useState("");

  const tables = [
    { table: 1, place: "Corner Seet" },
    { table: 2, place: "Window Seet" },
    { table: 3, place: "Center Seet" },
    { table: 4, place: "Corner Seet" },
    { table: 5, place: "Window Seet" },
    { table: 6, place: "Center Seet" },
    { table: 7, place: "Corner Seet" },
    { table: 8, place: "Window Seet" },
    { table: 9, place: "Center Seet" },
    { table: 10, place: "Corner Seet" },
  ];

  const cancels = () => {
    setModalShow(false);
    setcount(1);
    setbookTable(null);
    setname("");
    setnumber("");
    setpeople("");
    settime(null);
  };

  const counting = () => {
    if (count === 1) {
      setcount(2);
    } else {
      setModalShow(false);
      // axios
      //   .post("apiCall")
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data === "success") {
      //       setModalShow(false);
      //     } else {
      //       alert("Please Try Again");
      //     }
      //   })
      //   .catch((err) => console.error(err.message));
    }
  };

  return (
    <div className="entire" style={{ height: `${height}px` }}>
      <div className="dim" style={{ height: `${height}px` }}>
        <div className="booking" style={{ top: `${difHeight}px` }}>
          <img src={Booking} alt="booking" />
          <h3 className="text-center text-secondary m-4">No Booking</h3>
          <center>
            <Button variant="success" onClick={() => setModalShow(true)}>
              Book Table
            </Button>
          </center>
        </div>
      </div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ margin: "auto" }}
          >
            Book Your Table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
          {count === 1 ? (
            <Row>
              {tables.map((itm, index) => (
                <Col lg={3} key={index} className="mb-5">
                  <Button
                    variant={
                      itm.table === bookTable
                        ? "secondary"
                        : "outline-secondary"
                    }
                    onClick={() => setbookTable(itm.table)}
                  >
                    <p className="mb-0">Table {itm.table}</p>
                    <Badge bg="warning" text="dark">
                      {itm.place}
                    </Badge>
                  </Button>
                </Col>
              ))}
            </Row>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Number Of People</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number Of People"
                  value={people}
                  onChange={(e) => setpeople(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Choose Time</Form.Label>
                <TimePicker
                  start="00:00"
                  end="24:00"
                  step={30}
                  onChange={(e) => settime(e)}
                  value={time}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 justify-content-evenly">
            <Button variant="danger" onClick={cancels} className="w-25">
              Cancel
            </Button>
            {count === 1 ? (
              <Button
                variant="success"
                className="w-25"
                onClick={counting}
                disabled={bookTable === null ? true : false}
              >
                Next
              </Button>
            ) : (
              <Button
                disabled={
                  name !== "" && number !== "" && people !== "" && time !== null
                    ? false
                    : true
                }
                variant="success"
                className="w-25"
                onClick={counting}
              >
                Book
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
