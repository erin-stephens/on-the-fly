import React, { useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DarkLogo from './DarkLogo';

export default function OffcanvasMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" onClick={handleShow} className="redBtn offcanvasBtn">&#9776;</button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          <DarkLogo />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav onClick={handleClose}>
            <Link href="/">Home
            </Link>
            <hr />
            <Link href="/myPage" passHref>My Resources
            </Link>
            <hr />
            <Link href="/activities" passHref> View Activities
            </Link>
            <hr />
            <Link href="/lessonPlans" passHref> View Lesson Plans
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
