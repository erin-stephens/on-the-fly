import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ActivityCard from '../../components/ActivityCard';
import { getRecessActivities } from '../../api/filterActivityData';

export default function IndoorRecessPage() {
  const [activities, setActivities] = useState([]);

  const getAllRecessActivities = () => getRecessActivities().then(setActivities);

  useEffect(() => {
    getAllRecessActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Indoor Recess Activities</title>
      </Head>
      <h1> Indoor Recess Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebaseKey} activityObj={activity} onUpdate={getAllRecessActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><button type="button" className="mintBtn">Back</button></Link>
    </>
  );
}
