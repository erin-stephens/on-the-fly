/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import Logo from './Logo';
import UserProfile from './UserProfile';
import OffcanvasMenu from './Offcanvas';

export default function NavBar() {
  return (
    <div>
      <Navbar>
        <div className="hamburgerBtn">
          <OffcanvasMenu />
        </div>
        <div className="logoContainer">
          <Link passHref href="/">
            <Navbar.Brand>
              <div style={{
                height: '100px',
                width: '100px',
              }}
              >
                <Logo />
              </div>
            </Navbar.Brand>
          </Link>
        </div>
        <div
          className="userProfileContainer"
        >
          <UserProfile />
        </div>
      </Navbar>
    </div>
  );
}
