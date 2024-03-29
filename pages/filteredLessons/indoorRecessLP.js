import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LessonCard from '../../components/LessonCard';
import { getRecessLessons } from '../../api/filterLessonData';

export default function IndoorRecessLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllRecessLessons = () => getRecessLessons().then(setLessons);

  useEffect(() => {
    getAllRecessLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Indoor Recess Lessons</title>
      </Head>
      <h1> Indoor Recess Lessons </h1>
      <div className="d-flex flex-wrap lessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllRecessLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><button type="button" className="mintBtn">Back</button></Link>
    </>
  );
}
