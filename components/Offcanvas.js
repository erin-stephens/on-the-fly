import React, { useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffcanvasMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" onClick={handleShow} className="me-2 redBtn btn">&#9776;</button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>On the Fly</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav onClick={handleClose}>
            <Link href="/">Home
            </Link>
            <Link href="/myPage" passHref>My Page
            </Link>
            <Link href="/activities" passHref> View Activities
            </Link>
            <Link href="/lessonPlans" passHref> View Lesson Plans
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
