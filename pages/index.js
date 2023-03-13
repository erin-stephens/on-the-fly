import React from 'react';
import Head from 'next/head';
import ActivityCarousel from '../components/homepage/ActivityCarousel';
import LessonCarousel from '../components/homepage/LessonCarousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="activityIndex">
        <h1>All Activities</h1>
        <div className="activityCarouselContainer">
          <ActivityCarousel />
        </div>
      </div>
      <hr />
      <div>
        <h1>All Lesson Plans</h1>
        <div className="lessonCarouselContainer">
          <LessonCarousel />
        </div>
      </div>
    </>
  );
}
