import React, { useEffect, useState } from "react";
import Bookings from "../assets/img/booking.jpg";
import "../assets/css/home.css";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import { BsChevronLeft } from "react-icons/bs";
import Booking from "./Booking";
import { useDispatch, useSelector } from "react-redux";
import { homeProduct } from "../Redux/Action/Action";
import moment from "moment";
import Authaxios from "../Interceptor/Authaxios";

export default function Home() {
  const height = window.innerHeight;
  const difHeight = height / 2 - 369.594 / 2;
  const [modalShow, setModalShow] = useState(false);
  const [bookTable, setbookTable] = useState([]);
  const [count, setcount] = useState(1);
  const [time, settime] = useState("00:00");
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [people, setpeople] = useState("");
  const [timeErr, settimeErr] = useState(true);
  const [change, setchange] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.addHome.home);

  const tables = [
    { table: 1, place: "Corner With 4 Seets", size: 4 },
    { table: 2, place: "Window With 2 Seets", size: 2 },
    { table: 3, place: "Center With 4 Seets", size: 4 },
    { table: 4, place: "Corner With 2 Seets", size: 2 },
    { table: 5, place: "Window With 4 Seets", size: 4 },
    { table: 6, place: "Center With 2 Seets", size: 2 },
    { table: 7, place: "Corner With 4 Seets", size: 4 },
    { table: 8, place: "Window With 2 Seets", size: 2 },
    { table: 9, place: "Center With 4 Seets", size: 4 },
    { table: 10, place: "Corner With 2 Seets", size: 2 },
  ];

  const cancels = () => {
    setModalShow(false);
    setcount(1);
    setbookTable([]);
    setname("");
    setnumber("");
    setpeople("");
    settime("00:00");
    setchange(false);
  };

  const books = (itm) => {
    if (
      bookTable.find((nam) => Number(nam) === Number(itm.table)) === itm.table
    ) {
      var arr = [...bookTable];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === itm.table) {
          arr.splice(i, 1);
        }
      }
      setbookTable(arr);
    } else {
      setbookTable((bookTable) => [...bookTable, itm.table]);
    }
  };

  const times = moment().startOf("day").seconds(time).format("H:mm");
  const tableBookings = bookTable.join(",");

  const counting = () => {
    if (count === 1) {
      setcount(2);
    } else {
      Authaxios.post("Users", {
        userName: `${name}`,
        mobile: `${number}`,
        people: Number(people),
        time: `${times}`,
        table: `${tableBookings}`,
      })
        .then((res) => {
          localStorage.setItem("user", res.data._id);
          dispatch(homeProduct(res.data._id));
          setModalShow(false);
          setcount(1);
          setbookTable([]);
          setname("");
          setnumber("");
          setpeople("");
          settime("00:00");
          setchange(false);
        })
        .catch((err) => console.error(err.message));
    }
  };

  useEffect(() => {
    if (
      Number(times.split(":")[0]) >= 19 &&
      Number(times.split(":")[0]) <= 20
    ) {
      if (Number(times.split(":")[0]) === 20) {
        if (Number(times.split(":")[1]) === 0) {
          settimeErr(false);
          setchange(true);
        } else {
          settimeErr(true);
          setchange(false);
        }
      } else {
        settimeErr(false);
        setchange(true);
      }
    } else {
      settimeErr(true);
      setchange(false);
    }
  }, [times]);

  return (
    <div className="entire" style={{ height: `${height}px` }}>
      <div className="dim" style={{ height: `${height}px` }}>
        {token === null ? (
          <div className="booking" style={{ top: `${difHeight}px` }}>
            <img src={Bookings} alt="booking" />
            <h3 className="text-center text-secondary m-4">No Booking</h3>
            <center>
              <Button variant="success" onClick={() => setModalShow(true)}>
                Book Table
              </Button>
            </center>
          </div>
        ) : (
          <Booking />
        )}
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
            className="d-flex w-100"
          >
            {count === 2 ? (
              <BsChevronLeft
                className="mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => setcount(1)}
              />
            ) : null}
            <div className="w-100 text-center">Book Your Table</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
          {count === 1 ? (
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
                  onChange={settime}
                  value={time}
                />
                {timeErr ? (
                  <span className="text-danger">
                    * Dinner only available till 8:00PM
                  </span>
                ) : null}
              </Form.Group>
            </Form>
          ) : (
            <Row>
              {tables.map((itm, index) =>
                people >= 4 ? (
                  <Col lg={3} md={3} sm={6} xs={6} key={index} className="mb-5">
                    <Button
                      variant={
                        bookTable.find(
                          (nam) => Number(nam) === Number(itm.table)
                        ) === itm.table
                          ? "info"
                          : "outline-info"
                      }
                      onClick={() => books(itm)}
                    >
                      <p className="mb-0">Table {itm.table}</p>
                      <Badge bg="warning" text="dark">
                        {itm.place}
                      </Badge>
                    </Button>
                  </Col>
                ) : itm.size === 2 ? (
                  <Col lg={3} md={3} sm={6} xs={6} key={index} className="mb-5">
                    <Button
                      variant={
                        bookTable.find(
                          (nam) => Number(nam) === Number(itm.table)
                        ) === itm.table
                          ? "info"
                          : "outline-info"
                      }
                      onClick={() => books(itm)}
                    >
                      <p className="mb-0">Table {itm.table}</p>
                      <Badge bg="warning" text="dark">
                        {itm.place}
                      </Badge>
                    </Button>
                  </Col>
                ) : null
              )}
            </Row>
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
                disabled={
                  name !== "" && number !== "" && people !== "" && change
                    ? false
                    : true
                }
              >
                Next
              </Button>
            ) : (
              <Button
                disabled={bookTable === null ? true : false}
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
