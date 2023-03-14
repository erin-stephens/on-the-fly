/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAllActivities } from '../../api/activityData';
import { getSingleLesson } from '../../api/lessonData';
import { getMergedObjectsByLessonId } from '../../api/mergedData';
import LessonActivityCard from '../../components/LessonActivityCard';
import AddActivitytoLesson from '../../components/AddActivitytoLesson';
import math from '../../src/assets/icons/math.png';
import reading from '../../src/assets/icons/reading.png';
import science from '../../src/assets/icons/science.png';
import socialStudies from '../../src/assets/icons/social-studies.png';
import brainBreak from '../../src/assets/icons/brain-break.png';
import indoorRecess from '../../src/assets/icons/indoor-recess.png';

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
  }, [firebaseKey, activities]);
  const lessonIcon = () => {
    switch (lesson.subject) {
      case 'math':
        return <Image src={math} alt="math" className="icon" />;
      case 'reading':
        return <Image src={reading} alt="reading" className="icon" />;
      case 'science':
        return <Image src={science} alt="science" className="icon" />;
      case 'social studies':
        return <Image src={socialStudies} alt="social studies" className="icon" />;
      case 'brain break':
        return <Image src={brainBreak} alt="brain break" className="icon" />;
      case 'indoor recess':
        return <Image src={indoorRecess} alt="indoor recess" className="icon" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{lesson.lesson_name}</title>
      </Head>
      <div className="lessonDetailsContainer">
        <div className="lessonImage">
          {lessonIcon(lesson.subject)}
        </div>
        <div className="text-white ms-5 details">
          <h5>{lesson.lesson_name}</h5>
          <p>{lesson.directions}</p>
        </div>
      </div>
      <div>
        <AddActivitytoLesson obj={lesson} />
      </div>
      <hr className="text-white" />
      <div>
        <div className=" d-flex flex-wrap justify-content-center">
          {activities.map((item) => <LessonActivityCard key={item.firebaseKey} lessonActivityObj={item} lessonPlan_id={firebaseKey} onUpdate={getLessonDetails} />)}
        </div>
      </div>
    </>
  );
}
