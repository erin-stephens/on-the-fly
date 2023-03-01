import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllLessons } from '../api/lessonData';
import LessonCard from '../components/LessonCard';

export default function LessonPlansPage() {
  const [lessons, setLessons] = useState([]);

  const getLessons = () => {
    getAllLessons().then(setLessons);
  };

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div>
      <Head>
        <title>All Lessons</title>
      </Head>
      <>
        <Link passHref href="/lesson/new"><button type="button">Create a Lesson</button></Link>
      </>
      <h1> All Lessons </h1>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
      ))}
    </div>
  );
}
