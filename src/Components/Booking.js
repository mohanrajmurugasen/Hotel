import React, { useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import Bookings from "../assets/img/booking.jpg";
import "../assets/css/booking.css";
import TimePicker from "react-bootstrap-time-picker";
import { useDispatch } from "react-redux";
import { homeProduct } from "../Redux/Action/Action";

export default function Booking() {
  const height = window.innerHeight;
  const difHeight = height / 2 - 460.5 / 2;
  const [modalShow, setModalShow] = useState(false);
  const [modal, setmodal] = useState(1);
  const [time, settime] = useState(null);
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [people, setpeople] = useState("");

  const dispatch = useDispatch();

  const update = (x) => {
    setModalShow(true);
    setmodal(x);
    if (x === 2) {
      settime("10:30");
      setname("Mohanraj");
      setnumber("6544");
      setpeople(2);
    }
  };

  const terminate = () => {
    setModalShow(false);
    dispatch(homeProduct(null));
    localStorage.removeItem("user");
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
                1,2
              </Badge>
            </h5>
            <h5 className="w-100 d-flex">
              <b className="w-50">People :</b>{" "}
              <Badge bg="secondary" text="light" className="w-50">
                4
              </Badge>
            </h5>
            <h5 className="w-100 d-flex">
              <b className="w-50">Time :</b>{" "}
              <Badge bg="secondary" text="light" className="w-50">
                10:03
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
