import React from 'react';
import Head from 'next/head';
import LessonForm from '../../components/forms/LessonForm';

export default function AddLessonPlan() {
  return (
    <>
      <Head><title>Add a Lesson</title></Head>
      <LessonForm />
    </>
  );
}
