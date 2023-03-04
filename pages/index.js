import React from 'react';
import ActivityCarousel from '../components/ActivityCarousel';
import LessonCarousel from '../components/LessonCarousel';

export default function Home() {
  return (
    <>
      <div>
        <h1>All Activities</h1>
        <ActivityCarousel />
      </div>
      <hr />
      <div>
        <h1>All Lesson Plans</h1>
        <LessonCarousel />
      </div>
    </>
  );
}
