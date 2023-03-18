import React from 'react';
import Head from 'next/head';
import UserActivityCarousel from '../components/userpage/UserActivityCarousel';
import UserLessonCarousel from '../components/userpage/UserLessonCarousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Resources</title>
      </Head>
      <div className="activityIndex">
        <h1>Your Activities</h1>
        <div className="activityCarouselContainer">
          <UserActivityCarousel />
        </div>
      </div>
      <div className="lessonIndex">
        <h1>Your Lesson Plans</h1>
        <div className="lessonCarouselContainer">
          <UserLessonCarousel />
        </div>
      </div>
    </>
  );
}
