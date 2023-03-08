import React from 'react';
import UserActivityCarousel from '../components/userpage/UserActivityCarousel';
import UserLessonCarousel from '../components/userpage/UserLessonCarousel';

export default function Home() {
  return (
    <>
      <div className="activityIndex">
        <h1>All Activities</h1>
        <div className="activityCarouselContainer">
          <UserActivityCarousel />
        </div>
      </div>
      <hr />
      <div>
        <h1>All Lesson Plans</h1>
        <div className="lessonCarouselContainer">
          <UserLessonCarousel />
        </div>
      </div>
    </>
  );
}
