import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ActivityCard from '../../components/ActivityCard';
import { getBBActivities } from '../../api/filterActivityData';

export default function BrainBreakPage() {
  const [activities, setActivities] = useState([]);

  const getAllBBActivities = () => getBBActivities().then(setActivities);

  useEffect(() => {
    getAllBBActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Brain Break Activities</title>
      </Head>
      <h1> Brain Break Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebaseKey} activityObj={activity} onUpdate={getAllBBActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><button type="button" className="mintBtn">Back</button></Link>
    </>
  );
}
