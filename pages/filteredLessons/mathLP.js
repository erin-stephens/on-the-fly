import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import LessonCard from '../../components/LessonCard';
import { getMathLessons } from '../../api/filterLessonData';

export default function MathLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllMathLessons = () => getMathLessons().then(setLessons);

  useEffect(() => {
    getAllMathLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Math Lessons</title>
      </Head>
      <h1> Math Lessons </h1>
      <div className="d-flex flex-wrap LessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllMathLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
