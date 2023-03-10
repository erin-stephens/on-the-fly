import React from 'react';
import Logo from './Logo';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 className="text-white">Need a plan? Sign in Below!</h1>
      <Logo />
      <button type="button" className="redBtn btn btn-lg copy-btn" onClick={signIn}>
        Sign In
      </button>
    </div>

  );
}

export default Signin;
