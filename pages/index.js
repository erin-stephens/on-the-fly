import React from 'react';
import ActivityCarousel from '../components/homepage/ActivityCarousel';
import LessonCarousel from '../components/homepage/LessonCarousel';

export default function Home() {
  return (
    <>
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
