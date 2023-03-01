import React, { useState, useEffect } from 'react';
import { getAllLessons } from '../api/lessonData';
import LessonCard from '../components/LessonCard';

export default function LessonPlansPage() {
  const [lessons, setLessons] = useState([]);

  const getLessons = () => {
    getAllLessons().then(setLessons);
  };

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
      ))}
    </div>
  );
}
