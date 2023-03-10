import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleActivity } from '../../api/activityData';
import AddtoLessonModal from '../../components/AddtoLessonModal';

export default function ViewActivity() {
  const [activity, setActivity] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleActivity(firebaseKey).then(setActivity);
  }, [firebaseKey]);

  console.warn(activity);

  return (
    <>
      <Head>
        <title>{activity.activity_name}</title>
      </Head>
      <div className="videoContainer">
        <iframe
          title={activity.activity_name}
          src={activity.activity_url}
          className="activityVideo"
          allowFullScreen=""
        />
      </div>
      <div className="text-white">
        <h1>{activity.activity_name}</h1>
        <h5>Subject: {activity.subject}</h5>
        <h5>Length: {activity.length} minutes</h5>
        <h5>Grade: {activity.grade}</h5>
        <h5>Added by: {activity.username}</h5>
        <p>Description: {activity.description}</p>
      </div>
      <div className="addtolesson">
        <AddtoLessonModal />
      </div>
    </>
  );
}
