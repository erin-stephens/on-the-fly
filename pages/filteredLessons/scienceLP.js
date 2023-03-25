import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LessonCard from '../../components/LessonCard';
import { getScienceLessons } from '../../api/filterLessonData';

export default function ScienceLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllScienceLessons = () => getScienceLessons().then(setLessons);

  useEffect(() => {
    getAllScienceLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Science Lessons</title>
      </Head>
      <h1> Science Lessons </h1>
      <div className="d-flex flex-wrap LessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllScienceLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><button type="button" className="mintBtn">Back</button></Link>
    </>
  );
}
