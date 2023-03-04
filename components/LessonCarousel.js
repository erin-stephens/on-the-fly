import React, { useState, useEffect } from 'react';
import { getAllLessons } from '../api/lessonData';

export default function LessonCarousel() {
  // eslint-disable-next-line no-unused-vars
  const [lessons, setLessons] = useState([]);
  const getLessons = () => {
    getAllLessons().then(setLessons);
  };
  useEffect(() => {
    getLessons();
  }, []);
  return (
    <div>LessonCarousel</div>
  );
}
