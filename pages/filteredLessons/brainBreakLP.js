import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import LessonCard from '../../components/LessonCard';
import { getBBLessons } from '../../api/filterLessonData';

export default function BrainBreakLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllBBLessons = () => getBBLessons().then(setLessons);

  useEffect(() => {
    getAllBBLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Brain Break Lessons</title>
      </Head>
      <h1> Brain Break Lessons </h1>
      <div className="d-flex flex-wrap lessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllBBLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
