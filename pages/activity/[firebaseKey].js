import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleActivity } from '../../api/activityData';

export default function ViewActivity() {
  const [activity, setActivity] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleActivity(firebaseKey).then(setActivity);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{activity.activity_name}</title>
      </Head>
      <div>
        <iframe
          title={activity.activity_name}
          src={activity.activity_url}
        />
      </div>
      <div className="text-white">
        <h1>{activity.activity_name}</h1>
        <h5>Subject: {activity.subject}</h5>
        <h5>Length: {activity.length}</h5>
        <h5>Grade: {activity.grade}</h5>
        <h5>Added by: {activity.username}</h5>
        <p>Description: {activity.description}</p>
      </div>
    </>
  );
}
