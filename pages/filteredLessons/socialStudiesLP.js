import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import LessonCard from '../../components/LessonCard';
import { getSSLessons } from '../../api/filterLessonData';

export default function SocialStudiesLessonPage() {
  const [lessons, setLessons] = useState([]);

  const getAllSSLessons = () => getSSLessons().then(setLessons);

  useEffect(() => {
    getAllSSLessons();
  }, []);

  console.warn(lessons);

  return (
    <>
      <Head>
        <title>Social Studies Lessons</title>
      </Head>
      <h1> Social Studies Lessons </h1>
      <div className="d-flex flex-wrap LessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getAllSSLessons} />
        ))}
      </div>
      <Link passHref href="/lessonPlans"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
