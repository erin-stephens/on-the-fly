import React from 'react';
import Head from 'next/head';
import ActivityForm from '../../components/forms/ActivityForm';

export default function AddActivity() {
  return (
    <>
      <Head><title>Add an Activity</title></Head>
      <ActivityForm />
    </>
  );
}
