import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleLesson } from '../../../api/lessonData';
import LessonForm from '../../../components/forms/LessonForm';

export default function EditLessonPlan() {
  const [editLesson, setEditLesson] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleLesson(firebaseKey).then(setEditLesson);
  }, [firebaseKey]);

  return (
    <LessonForm obj={editLesson} />
  );
}
