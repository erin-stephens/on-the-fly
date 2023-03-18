import React from 'react';
import Image from 'next/image';
import darkLogo from '../src/assets/images/logo-dark.png';

export default function DarkLogo() {
  return (
    <>
      <Image src={darkLogo} alt="dark logo" className="darkLogo" />
    </>
  );
}
