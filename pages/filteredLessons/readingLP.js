import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LessonCard from '../../components/LessonCard';
import { getReadingLessons } from '../../api/filterLessonData';

export default function ReadingLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllReadingLessons = () => getReadingLessons().then(setLessons);

  useEffect(() => {
    getAllReadingLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Reading Lessons</title>
      </Head>
      <h1> Reading Lessons </h1>
      <div className="d-flex flex-wrap LessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllReadingLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><button type="button" className="mintBtn">Back</button></Link>
    </>
  );
}
