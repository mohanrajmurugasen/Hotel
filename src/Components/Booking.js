import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import Bookings from "../assets/img/booking.jpg";
import "../assets/css/booking.css";
import TimePicker from "react-bootstrap-time-picker";
import { useDispatch } from "react-redux";
import { homeProduct } from "../Redux/Action/Action";
import Authaxios from "../Interceptor/Authaxios";

export default function Booking() {
  const height = window.innerHeight;
  const difHeight = height / 2 - 460.5 / 2;
  const [modalShow, setModalShow] = useState(false);
  const [modal, setmodal] = useState(1);
  const [time, settime] = useState(null);
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [people, setpeople] = useState("");
  const [data, setdata] = useState(null);
  const [table, settable] = useState(null);

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

  const id = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  // console.log(id);

  useEffect(() => {
    Authaxios.get(`UsersById/${id}`)
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err.message));
  }, [id]);

  const dispatch = useDispatch();

  const update = (x) => {
    setModalShow(true);
    setmodal(x);
    if (x === 2) {
      settime(data.time);
      setname(data.userName);
      setpeople(Number(data.people));
      settable(data.table);
    }
  };

  const terminate = () => {
    Authaxios.delete(`DeleteUsersById/${id}`)
      .then((res) => {
        console.log(res.data);
        setModalShow(false);
        dispatch(homeProduct(null));
        localStorage.removeItem("user");
      })
      .catch((err) => console.error(err.message));
  };

  const edit = () => {
    setModalShow(false);
  };
  return (
    <div>
      <div className="booking2" style={{ top: `${difHeight}px` }}>
        <img src={Bookings} alt="booking" />
        <div className="m-3">
          <div className="list">
            <h5 className="w-100 d-flex">
              <b className="w-50">Table No :</b>{" "}
              <Badge bg="secondary" text="light" className="w-50">
                {data !== null && data.table}
              </Badge>
            </h5>
            <h5 className="w-100 d-flex">
              <b className="w-50">People :</b>{" "}
              <Badge bg="secondary" text="light" className="w-50">
                {data !== null && data.people}
              </Badge>
            </h5>
            <h5 className="w-100 d-flex">
              <b className="w-50">Time :</b>{" "}
              <Badge bg="secondary" text="light" className="w-50">
                {data !== null && data.time}
              </Badge>
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <Button variant="danger" onClick={() => update(1)}>
            Cancel Booking
          </Button>
          <Button variant="success" onClick={() => update(2)}>
            Edit Booking
          </Button>
        </div>
      </div>
      <Modal
        show={modalShow}
        size={modal === 1 ? "md" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {modal === 1 ? (
          <div>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter" className="w-100">
                <div className="w-100 text-center">Booking Cancel</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-100">
              <p className="w-100 text-center">
                Do you want to cancel this booking ?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex w-100 justify-content-evenly">
                <Button
                  variant="danger"
                  className="w-25"
                  onClick={() => setModalShow(false)}
                >
                  No
                </Button>
                <Button variant="success" className="w-25" onClick={terminate}>
                  Yes
                </Button>
              </div>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter" className="w-100">
                <div className="w-100 text-center">Edit Booking</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-3">
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
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex w-100 justify-content-evenly">
                <Button
                  variant="danger"
                  className="w-25"
                  onClick={() => setModalShow(false)}
                >
                  Cancel
                </Button>
                <Button variant="success" className="w-25" onClick={edit}>
                  Update
                </Button>
              </div>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
}
