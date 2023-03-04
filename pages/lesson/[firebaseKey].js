/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllActivities } from '../../api/activityData';
import { getSingleLesson } from '../../api/lessonData';
import { getMergedObjectsByLessonId } from '../../api/mergedData';
import ActivityCard from '../../components/ActivityCard';

export default function ViewLessonPlan() {
  const [lesson, setLesson] = useState({});
  const [activities, setActivities] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getLessonDetails = () => {
    getSingleLesson(firebaseKey).then(setLesson);
    getMergedObjectsByLessonId(firebaseKey).then((arr) => {
      const activityKeys = arr.map((item) => item.activity_id);
      getAllActivities().then((activitiesArr) => {
        const activitiesArray = activitiesArr.filter((activity) => activityKeys.includes(activity.firebaseKey));
        setActivities(activitiesArray);
      });
    });
  };

  useEffect(() => {
    getLessonDetails();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{lesson.lesson_name}</title>
      </Head>
      <div className="text-white ms-5 details">
        <h5>{lesson.lesson_name}</h5>
      </div>
      <div>
        <div className=" d-flex flex-wrap justify-content-center">
          {activities.map((item) => <ActivityCard key={item.firebaseKey} activityObj={item} lessonPlan_id={firebaseKey} onUpdate={getLessonDetails} />)}
        </div>
      </div>
    </>
  );
}
