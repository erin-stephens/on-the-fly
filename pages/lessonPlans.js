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
      <div className="addLessonContainer">
        <Link passHref href="/lesson/new"><button type="button" className="redBtn btn">Create a Lesson</button></Link>
      </div>
      <h1> All Lessons </h1>
      <div className="lessonCardContainer">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
        ))}
      </div>
    </div>
  );
}
