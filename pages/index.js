import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ActivityCarousel from '../components/homepage/ActivityCarousel';
import LessonCarousel from '../components/homepage/LessonCarousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="lessonIndex">
        <Link href="/lessonPlans" passHref>
          <h1 className="links">Explore Lesson Plans</h1>
        </Link>
        <div className="lessonCarouselContainer">
          <LessonCarousel />
        </div>
      </div>
      <div className="activityIndex">
        <Link href="/activities" passHref>
          <h1 className="links">Explore Activities</h1>
        </Link>
        <div className="activityCarouselContainer">
          <ActivityCarousel />
        </div>
      </div>
    </>
  );
}
