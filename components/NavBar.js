/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Logo from './Logo';
import UserProfile from './UserProfile';

export default function NavBar() {
  return (
    <Navbar expand="lg">
      <div>
        <Link passHref href="/">
          <Navbar.Brand>
            <div style={{
              height: '150px',
              width: '150px',
            }}
            >
              <Logo />
            </div>
          </Navbar.Brand>
        </Link>
      </div>
      <div className="navdropdown">
        <NavDropdown title="Resources" id="basic-nav-dropdown">
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/myPage">
            My Page
          </NavDropdown.Item>
          <NavDropdown.Item href="/activities">View Activities</NavDropdown.Item>
          <NavDropdown.Item href="/lessonPlans">
            View Lesson Plans
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      <div
        className="signOutBtn"
        style={{
          padding: '0px 20px 0px 0px',
        }}
      >
        <UserProfile />
      </div>
    </Navbar>
  );
}
