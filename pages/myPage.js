import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import UserActivityCarousel from '../components/userpage/UserActivityCarousel';
import UserLessonCarousel from '../components/userpage/UserLessonCarousel';

export default function UserPage() {
  return (
    <>
      <Head>
        <title>My Resources</title>
      </Head>
      <div className="lessonIndex">
        <Link href="/myLessons" passHref>
          <h1 className="links">My Lesson Plans</h1>
        </Link>
        <div className="lessonCarouselContainer">
          <UserLessonCarousel />
        </div>
      </div>
      <div className="activityIndex">
        <Link href="/myActivities" passHref>
          <h1 className="links">My Activities</h1>
        </Link>
        <div className="activityCarouselContainer">
          <UserActivityCarousel />
        </div>
      </div>
    </>
  );
}
