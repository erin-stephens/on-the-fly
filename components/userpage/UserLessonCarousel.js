/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import LessonCard from '../LessonCard';
import { getUserLessons } from '../../api/lessonData';
import { useAuth } from '../../utils/context/authContext';

export default function UserLessonCarousel() {
  const [lessons, setLessons] = useState([]);
  const { user } = useAuth();

  const getLessons = () => {
    getUserLessons(user.uid).then(setLessons);
  };
  useEffect(() => {
    getLessons();
  }, [user]);
  return (
    <Carousel interval={null} className="lessonCarouselContainer">
      {lessons.map((lesson) => (
        <Carousel.Item className="lessonCarouselItem">
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
