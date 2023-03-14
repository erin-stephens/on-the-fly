import React, { useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from './Logo';

export default function OffcanvasMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" onClick={handleShow} className="redBtn btn btn-lg">&#9776;</button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <div style={{
            height: '200px',
            width: '200px',
          }}
          >
            <Logo />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav onClick={handleClose}>
            <Link href="/">Home
            </Link>
            <hr className="text-white" />
            <Link href="/myPage" passHref>My Resources
            </Link>
            <hr className="text-white" />
            <Link href="/activities" passHref> View Activities
            </Link>
            <hr className="text-white" />
            <Link href="/lessonPlans" passHref> View Lesson Plans
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
