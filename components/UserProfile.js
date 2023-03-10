/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Modal, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="profileModal">
      <Image
        src={user.photoURL}
        alt="User"
        width="60"
        height="60"
        onClick={handleShow}
        roundedCircle
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Image
            src={user.photoURL}
            alt="User"
            width="60"
            height="60"
            onClick={handleShow}
            roundedCircle
          />
          <div>
            <h6>{user.displayName}</h6>
            <h6>{user.email}</h6>
          </div>
        </Modal.Header>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={signOut}>
            Sign Out
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
