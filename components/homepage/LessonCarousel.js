import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import LessonCard from '../LessonCard';
import { getAllLessons } from '../../api/lessonData';

export default function LessonCarousel() {
  const [lessons, setLessons] = useState([]);

  const getLessons = () => {
    getAllLessons().then(setLessons);
  };
  useEffect(() => {
    getLessons();
  }, []);
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
