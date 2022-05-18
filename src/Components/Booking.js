import React from "react";
import { Badge, Button } from "react-bootstrap";
import Bookings from "../assets/img/booking.jpg";
import "../assets/css/booking.css";

export default function Booking() {
  const height = window.innerHeight;
  const difHeight = height / 2 - 460.5 / 2;
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
          <Button variant="danger">Cancel Booking</Button>
          <Button variant="success">Edit Booking</Button>
        </div>
      </div>
    </div>
  );
}
